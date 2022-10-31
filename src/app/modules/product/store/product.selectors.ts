import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './reducers/index';

export const selectProductState =
  createFeatureSelector<ProductState>('products');

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products
);
export const selectLikesByUser = createSelector(
  selectProductState,
  (state) => state.likesByUser
);

export const selectCategories = createSelector(
  selectProductState,
  (state) => state.categories
);

export const selectProductsFilter = createSelector(
  selectProductState,
  (state) => state.productsFilter
);
