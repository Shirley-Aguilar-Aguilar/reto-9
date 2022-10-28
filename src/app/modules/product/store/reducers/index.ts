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


export const productFeatureKey = 'product';

export interface ProductState {
  product: (Product|undefined)
}

export const initialProductState: ProductState = {
  product:undefined
}

//export const reducers: ActionReducerMap<ProductState> = {};
//export const metaReducers: MetaReducer<ProductState>[] = !environment.production ? [] : [];

export const productReducer = createReducer(
  initialProductState,
  //on()

)
