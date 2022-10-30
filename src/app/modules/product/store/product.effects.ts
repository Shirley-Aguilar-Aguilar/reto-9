/* eslint-disable @ngrx/prefer-effect-callback-in-block-statement */
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, map, mergeMap, pipe, tap } from "rxjs";
import { Router } from '@angular/router';
//import { ProductAction } from "./product-action-types";
import { ProductService } from '../../../core/services/product.service';
import { catchError } from 'rxjs/operators';
import { loadLikesProduct } from './product.actions';
import * as ProductAction from './product.actions';


@Injectable()
export class ProductEffects {

   loadProducts$ = createEffect(() =>
    this.actions$
     .pipe(
        ofType(ProductAction.loadProducts),
        mergeMap(() => this.productService.getProducts()
          .pipe(
            map(products =>  ProductAction.loadProductsSuccess({products:products.data})),
            catchError(() => EMPTY)
          )
        )
     )
   );

   loadLikes$ = createEffect(() =>
   this.actions$
    .pipe(
       ofType(ProductAction.loadLikesProduct),
       tap((ids) => console.log(ids)),
       mergeMap((ids) => this.productService.getLikes(ids.idsPerProduct)
         .pipe(
           tap((ids) => console.log('likes de producto obtenido',ids)),
           map(likes =>  ProductAction.loadLikeProductSuccess({likesPerProduct: likes.data})),
           catchError(() => EMPTY)
         )
       )
    )
  )

  addLike$ = createEffect(() =>
    this.actions$
    .pipe(
      ofType(ProductAction.likeProduct),
      tap( like => console.log(like)),
      mergeMap( like => this.productService.postLike(like.bodyLikePerProduct)
        .pipe(
          tap( result => console.log("resultado post create like",result)),
          map(like =>  ProductAction.likeProductSuccess({likesPerProductResp: like})),
          catchError(() => EMPTY)
        )
      )
    )
  )

  deleteLike$ = createEffect(() =>
    this.actions$
    .pipe(
      ofType(ProductAction.dislikeProduct),
      tap(dislike => console.log(dislike)),
      mergeMap( dislike => this.productService.postLike(dislike.bodyLikePerProduct)
        .pipe(
          tap( result => console.log("resultado post create like",result)),
          map(dislike =>  ProductAction.dislikeProductSuccess({likesPerProductResp: dislike}))
        )
      )
    )
  )

  loadLikeByUser$ = createEffect(() =>
    this.actions$
    .pipe(
      ofType(ProductAction.loadLikesByUser),
      tap(id => console.log("idddddddddddddddddddddddduser",id)),
      mergeMap(result => this.productService.getLikesByUser(result.id)
        .pipe(
           tap(result => console.log("resultado post create like",result)),
           map(result => {
            //console.log("aquiiien map")
            //console.log(result)
            //console.log(result.data)

            //result = JSON.parse(JSON.stringify(result.data))
            ProductAction.loadLikesByUserSuccess({productsWithLike: result})
            console.log("lineaaaaa 86")

          })
        )
      )
    ),{dispatch:false}
  )






   constructor(
    private actions$: Actions,
    private productService: ProductService

    ){}

}
