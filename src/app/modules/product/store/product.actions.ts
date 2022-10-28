import { createAction, props } from '@ngrx/store';
import { Products } from 'src/app/shared/interfaces/product';

export const showProducts = createAction(
  "[Product Page] Products",
  props<{user: Products}>()
)
