import { createAction, props } from '@ngrx/store';
import {
  Category,
  Like,
  LikeBodyPost,
  LikeBodyResp,
  Product,
  Products,
} from 'src/app/shared/interfaces/product';
import { IdsForLike, Likes, Page } from '../../../shared/interfaces/product';

export const loadProducts = createAction('[Product Page] Load Products');

export const loadProductsSuccess = createAction(
  '[Product Page] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadCategories = createAction('[Product Page] Load Categories');

export const loadCategoriesSuccess = createAction(
  '[Product Page] Load Categories Success',
  props<{ categories: Category[] }>()
);

export const loadLikesByUser = createAction(
  '[Product Page] Load Likes By User',
  props<{ id: number }>()
);

export const loadLikesByUserSuccess = createAction(
  '[Product Page] Load Likes By User Success',
  props<{ productsWithLike: Like[] }>()
);

export const loadLikesProduct = createAction(
  '[Product Page] Load Like Product',
  props<{ idsPerProduct: IdsForLike }>()
);

export const loadLikeProductSuccess = createAction(
  '[Product Page] Load Like Product Success',
  props<{ likesPerProduct: Like }>()
);

export const likeProduct = createAction(
  '[Product Page] Add Like Product',
  props<{ bodyLikePerProduct: LikeBodyPost }>()
);

export const likeProductSuccess = createAction(
  '[Product Page] Add Like Product Success',
  props<{ likesPerProductResp: LikeBodyResp }>()
);

export const dislikeProduct = createAction(
  '[Product Page] Delete Like Product',
  props<{ bodyLikePerProduct: LikeBodyPost }>()
);

export const dislikeProductSuccess = createAction(
  '[Product Page] Delete Like Product Success',
  props<{ likesPerProductResp: LikeBodyResp }>()
);

export const loadFilterProducts = createAction(
  '[Product Page] Load Filter Products',
  props<{ idCategory: string }>()
);

export const loadProductsFilterSuccess = createAction(
  '[Product Page] Load Products filter Success',
  props<{ productsFilter: Product[] }>()
);

export const searchProducts = createAction(
  '[Product Page] Search Products',
  props<{ name: string }>()
);

export const loadPageSize = createAction(
  '[Product Page] Load Page ',
  props<{ page: Page }>()
);

export const loadPageSizeSuccess = createAction(
  '[Product Page] Load Page Success',
  props<{ products: Product[] }>()
);
