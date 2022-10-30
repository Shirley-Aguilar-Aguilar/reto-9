import { createAction, props } from '@ngrx/store';
import { Like, LikeBodyPost, LikeBodyResp, Product, Products } from 'src/app/shared/interfaces/product';
import { IdsForLike, Likes } from '../../../shared/interfaces/product';

export const loadProducts = createAction(
  "[Product Page] Load Products",
)

export const loadProductsSuccess = createAction(
  "[Product Page] Load Products Success",
  props<{products: Product[]}>()
)

export const loadLikesByUser = createAction(
  "[Product Page] Load Likes By User",
  props<{id: number}>()
)

export const loadLikesByUserSuccess = createAction(
  "[Product Page] Load Likes By User Success",
  props<{productsWithLike: Like[]}>()
)

export const loadLikesProduct = createAction(
  "[Product Page] Load Like Product",
  props<{idsPerProduct: IdsForLike}>()
)

export const loadLikeProductSuccess = createAction(
  "[Product Page] Load Like Product Success",
  props<{likesPerProduct: Like}>()
)

export const likeProduct = createAction(
  "[Product Page] Add Like Product",
  props<{bodyLikePerProduct: LikeBodyPost}>()
)

export const likeProductSuccess = createAction(
  "[Product Page] Add Like Product Success",
  props<{likesPerProductResp: LikeBodyResp}>()
)

export const dislikeProduct = createAction(
  "[Product Page] Delete Like Product",
  props<{bodyLikePerProduct: LikeBodyPost}>()
)

export const dislikeProductSuccess = createAction(
  "[Product Page] Delete Like Product Success",
  props<{likesPerProductResp: LikeBodyResp}>()
)


