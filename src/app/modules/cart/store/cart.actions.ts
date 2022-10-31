import { createAction, props } from '@ngrx/store';
import { Cart, payloadCreateCart } from 'src/app/shared/interfaces/cart';

export const deletecart = createAction('[Cart Page] Delete Card');

export const deleteCartSuccess = createAction('[Cart Page] Delete success');

export const createCart = createAction(
  '[Cart Page] Create Card',
  props<{ cart: payloadCreateCart }>()
);

export const createCartSuccess = createAction(
  '[Cart Page] Create success',
  props<{ cart: Cart }>()
);
