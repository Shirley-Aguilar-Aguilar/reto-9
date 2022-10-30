
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
import { Likes, Product, Like } from 'src/app/shared/interfaces/product';
import { ProductAction } from '../product-action-types';


export const productFeatureKey = 'products';
export const likesFeatureKey = 'likes';
export const likesByUserFeatureKey = 'likesByUser';

export interface ProductState {
  products: Product[],
  likes: Like,
  likesByUser: Like[];
}


export const initialProductsState: ProductState = {
  products:[],
  likes: {
    id: 0,
    user_id: 0,
    product_id: 0,
    kind: ''
  },
  likesByUser:[]
}

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
  }),
  on(ProductAction.loadLikeProductSuccess, (state, action):ProductState => {
    return {
      ...state,
      likes: action.likesPerProduct
    }
  }),
  on(ProductAction.likeProductSuccess, (state, action):ProductState => {
    return {
      ...state,
      likes: action.likesPerProductResp.data
    }
  }),
  on(ProductAction.loadLikesByUserSuccess, (state, action):ProductState => {

    return {
      ...state,
      likesByUser: action.productsWithLike
    }
  }),
)

