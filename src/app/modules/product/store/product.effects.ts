/* eslint-disable @ngrx/prefer-effect-callback-in-block-statement */
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, map, mergeMap, tap } from "rxjs";
import { Router } from '@angular/router';
import { ProductAction } from "./product-action-types";
import { ProductService } from '../../../core/services/product.service';
import { catchError } from 'rxjs/operators';


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
   )


   constructor(
    private actions$: Actions,
    private productService: ProductService

    ){}

}
