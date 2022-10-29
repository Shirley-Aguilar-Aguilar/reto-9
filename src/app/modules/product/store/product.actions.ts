import { createAction, props } from '@ngrx/store';
import { Product, Products } from 'src/app/shared/interfaces/product';

export const loadProducts = createAction(
  "[Product Page] Load Products",
)

export const loadProductsSuccess = createAction(
  "[Product Page] Load Products Success",
  props<{products: Product[]}>()
)

export const loadLikeProduct = createAction(
  "[Product Page] Load Like Product",
)

export const loadLikeProductSuccess = createAction(
  "[Product Page] Load Like Product Success",
  props<{product: Product}>()
)
