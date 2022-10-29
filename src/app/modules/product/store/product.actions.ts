import { createAction, props } from '@ngrx/store';
import { Product, Products } from 'src/app/shared/interfaces/product';

export const loadProducts = createAction(
  "[Product Page] Load Products",
)

export const loadProductsSuccess = createAction(
  "[Product Page] Load Products Success",
  props<{products: Product[]}>()
)
