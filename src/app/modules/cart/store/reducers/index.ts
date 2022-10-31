import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { Cart } from '../../../../shared/interfaces/cart';
import { CartActions } from '../action-types';

export const cartFeatureKey = 'cart';

export interface CartState {
  cart: Cart | undefined;
}

export const initialProductsState: CartState = {
  cart: undefined,
};

export const productReducer = createReducer(
  initialProductsState,
  on(CartActions.deleteCartSuccess, (state, action): CartState => {
    return {
      ...state,
    };
  }),

  on(CartActions.createCartSuccess, (state, action): CartState => {
    return {
      ...state,
      cart: action.cart,
    };
  })
);
