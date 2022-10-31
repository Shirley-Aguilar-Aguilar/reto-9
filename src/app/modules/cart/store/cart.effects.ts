/* eslint-disable @ngrx/prefer-effect-callback-in-block-statement */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../../../core/services/cart.service';
import { CartActions } from './action-types';
import { EMPTY, map, mergeMap, pipe, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CartEffects {
  deleteCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.deletecart),
      mergeMap(() =>
        this.cartService
          .deleteCart()
          .pipe(map(() => CartActions.deleteCartSuccess()))
      ),
      catchError((error) => {
        console.log(error);
        return EMPTY;
      })
    )
  );

  createcart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.createCart),
      mergeMap((payload) =>
        this.cartService
          .createCart(payload.cart)
          .pipe(
            map((result) => CartActions.createCartSuccess({ cart: result }))
          )
      )
    )
  );

  constructor(private actions$: Actions, private cartService: CartService) {}
}
