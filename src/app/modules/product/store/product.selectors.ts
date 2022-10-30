import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LikesStateByUser, ProductState } from './reducers/index';

export const selectProductState = createFeatureSelector<ProductState>('products')
export const selectLikesByUserState = createFeatureSelector<LikesStateByUser>('likesByUser')

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products

)
export const selectLikesByUser = createSelector(
  selectLikesByUserState,
  (state) => state.likesByUser

)
