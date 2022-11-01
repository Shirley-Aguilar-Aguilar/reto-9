/* eslint-disable @ngrx/no-dispatch-in-effects */
/* eslint-disable @ngrx/prefer-effect-callback-in-block-statement */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../../../core/services/cart.service';
import { CartActions } from './action-types';
import { map, mergeMap, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class CartEffects {
  deleteCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.deleteCart),
      mergeMap(() =>
        this.cartService
          .deleteCart()
          .pipe(map(() => CartActions.deleteCartSuccess()))
      )
    )
  );

  createCart$ = createEffect(() =>
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
        return of(
          CartActions.createCartFailure({
            message: 'Sorry, your proccess can not be successfull,try again',
          })
        );
      })
    )
  );

  updateCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateCart),
      mergeMap((payload) =>
        this.cartService.updateCart(payload.cart).pipe(
          map((result) => {
            return CartActions.updateCartSuccess({ cart: result });
          })
        )
      ),
      catchError((error) => {
        return of(
          CartActions.createCartFailure({
            message: 'Sorry, your proccess can not be successfull,try again',
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private cartService: CartService,
    private router: Router,
    private store: Store
  ) {}
}
