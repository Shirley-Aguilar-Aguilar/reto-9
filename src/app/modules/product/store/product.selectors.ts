import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './reducers/index';

export const selectProductState = createFeatureSelector<ProductState>('products')

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products

)
