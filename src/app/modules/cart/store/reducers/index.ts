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
  messageError: string;
}

export const initialProductsState: CartState = {
  cart: undefined,
  messageError: '',
};

export const productReducer = createReducer(
  initialProductsState,
  on(CartActions.deleteCartSuccess, (state, action): CartState => {
    return {
      ...state,
      cart: undefined,
    };
  }),

  on(CartActions.createCartSuccess, (state, action): CartState => {
    return {
      ...state,
      cart: action.cart,
    };
  }),

  on(CartActions.createCartFailure, (state, action): CartState => {
    return {
      ...state,
      messageError: action.message,
    };
  }),

  on(CartActions.updateCartSuccess, (state, action): CartState => {
    return {
      ...state,
      cart: action.cart,
    };
  })
);
