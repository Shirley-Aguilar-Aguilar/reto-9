import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './reducers/index';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectErrorMessage = createSelector(
  selectCartState,
  (state) => state.messageError
);

export const selectCard = createSelector(
  selectCartState,
  (state) => state.cart
);
