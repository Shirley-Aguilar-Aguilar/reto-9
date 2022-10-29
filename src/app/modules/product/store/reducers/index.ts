import { environment } from '../../../../../environments/environment.prod';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductAction } from '../product-action-types';


export const productFeatureKey = 'products';

export interface ProductState {
  products: Product[]
}

export const initialProductsState: ProductState = {
  products:[]
}

//export const reducers: ActionReducerMap<ProductState> = {};
//export const metaReducers: MetaReducer<ProductState>[] = !environment.production ? [] : [];

export const productReducer = createReducer(
  initialProductsState,
  on(ProductAction.loadProductsSuccess, (state, action):ProductState => {
    return {
      ...state,
      products: action.products
    }
  }),
  on(ProductAction.loadProductsSuccess, (state, action):ProductState => {
    return {
      ...state,
      products: action.products
    }
  })

)
