/* eslint-disable @ngrx/prefer-effect-callback-in-block-statement */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, map, mergeMap, pipe, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ProductAction } from './product-action-types';
import { ProductService } from '../../../core/services/product.service';
import { catchError, concatMap } from 'rxjs/operators';
import { loadLikesProduct } from './product.actions';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAction.loadProducts),
      concatMap(() =>
        this.productService
          .getProducts()
          .pipe(
            map((products) =>
              ProductAction.loadProductsSuccess({ products: products.data })
            )
          )
      )
    )
  );

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAction.loadCategories),
      concatMap(() =>
        this.productService.getCategories().pipe(
          map((category) =>
            ProductAction.loadCategoriesSuccess({ categories: category.data })
          ),
          catchError((error) => {
            console.log(error);
            return EMPTY;
          })
        )
      )
    )
  );

  loadLikes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAction.loadLikesProduct),
      tap((ids) => console.log(ids)),
      mergeMap((ids) =>
        this.productService.getLikes(ids.idsPerProduct).pipe(
          tap((ids) => console.log('likes de producto obtenido', ids)),
          map((likes) =>
            ProductAction.loadLikeProductSuccess({
              likesPerProduct: likes.data,
            })
          )
        )
      )
    )
  );

  addLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAction.likeProduct),
      tap((like) => console.log(like)),
      mergeMap((like) =>
        this.productService.postLike(like.bodyLikePerProduct).pipe(
          tap((result) => console.log('resultado post create like', result)),
          map((like) =>
            ProductAction.likeProductSuccess({ likesPerProductResp: like })
          )
        )
      )
    )
  );

  deleteLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAction.dislikeProduct),
      tap((dislike) => console.log(dislike)),
      mergeMap((dislike) =>
        this.productService.postLike(dislike.bodyLikePerProduct).pipe(
          tap((result) => console.log('resultado post create like', result)),
          map((dislike) =>
            ProductAction.dislikeProductSuccess({
              likesPerProductResp: dislike,
            })
          )
        )
      )
    )
  );

  loadFilterProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAction.loadFilterProducts),
      mergeMap((result) =>
        this.productService.getFilterProductByCategory(result.idCategory).pipe(
          map((products) =>
            ProductAction.loadProductsSuccess({
              products: products.data,
            })
          )
        )
      )
    )
  );

  searchProductsByName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAction.searchProducts),
      mergeMap((result) =>
        this.productService
          .searchProductsByName(result.name)
          .pipe(
            map((products) =>
              ProductAction.loadProductsSuccess({ products: products.data })
            )
          )
      )
    )
  );

  loadLikeByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAction.loadLikesByUser),
      mergeMap((result) =>
        this.productService.getLikesByUser(result.id).pipe(
          map((result) => {
            return ProductAction.loadLikesByUserSuccess({
              productsWithLike: result,
            });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
