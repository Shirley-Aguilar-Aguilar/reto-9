
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
  products: Product[]
}
export interface LikesState {
  likes: Like;
}
export interface LikesStateByUser {
  likesByUser: Like[];
}

export const initialProductsState: ProductState = {
  products:[]
}

export const initialLikesState: LikesState = {
  likes: {
    id: 0,
    user_id: 0,
    product_id: 0,
    kind: ''
  }
}
export const initialLikesStateByUser: LikesStateByUser = {
  likesByUser:[]
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
  }),


)

// likesss
export const likesReducer = createReducer(
  initialLikesState,
  on(ProductAction.loadLikeProductSuccess, (state, action):LikesState => {
    return {
      ...state,
      likes: action.likesPerProduct
    }
  }),
  on(ProductAction.likeProductSuccess, (state, action):LikesState => {
    return {
      ...state,
      likes: action.likesPerProductResp.data
    }
  }),
)

export const likesByUserReducer = createReducer(
  initialLikesStateByUser,
  on(ProductAction.loadLikesByUserSuccess, (state, action):LikesStateByUser => {

    return {
      ...state,
      likesByUser: action.productsWithLike
    }
  }),
)

