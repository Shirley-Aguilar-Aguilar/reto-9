import { createAction, props } from '@ngrx/store';
import {
  Cart,
  payloadCreateCart,
  UpdateProductReq,
} from 'src/app/shared/interfaces/cart';

export const deleteCart = createAction('[Cart Page] Delete Card');

export const deleteCartSuccess = createAction('[Cart Page] Delete success');

export const createCart = createAction(
  '[Cart Page] Create Card',
  props<{ cart: payloadCreateCart }>()
);

export const createCartSuccess = createAction(
  '[Cart Page] Create Card Success',
  props<{ cart: Cart }>()
);

export const createCartFailure = createAction(
  '[Cart Page] Create Card Failure',
  props<{ message: string }>()
);

export const updateCart = createAction(
  '[Cart Page] Update Card',
  props<{ cart: UpdateProductReq }>()
);

export const updateCartSuccess = createAction(
  '[Cart Page] Update Card Success',
  props<{ cart: Cart }>()
);

export const getCart = createAction('[Cart Page] Get Card');

export const getCartSuccess = createAction(
  '[Cart Page] Get Card Success',
  props<{ cart: Cart }>()
);
