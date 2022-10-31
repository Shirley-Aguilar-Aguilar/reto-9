/* eslint-disable @ngrx/prefer-effect-callback-in-block-statement */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../../../core/services/cart.service';
import { CartActions } from './action-types';
import { EMPTY, map, mergeMap, of, pipe, tap } from 'rxjs';
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
        console.log('There is not car in proccess');
        return EMPTY;
      })
    )
  );

  createcart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.createCart),
      mergeMap((payload) =>
        this.cartService.createCart(payload.cart).pipe(
          map((result) => {
            return CartActions.createCartSuccess({ cart: result });
          })
        )
      ),
      catchError((error) => {
        localStorage.removeItem('products');
        return of(
          CartActions.createCartFailure({
            message: 'Sorry, your proccess can not be successfull,try again',
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private cartService: CartService) {}
}