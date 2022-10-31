import { environment } from '../../../../../environments/environment.prod';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import {
  Likes,
  Product,
  Like,
  CategorytResp,
  Category,
} from 'src/app/shared/interfaces/product';
import { ProductAction } from '../product-action-types';

export const productFeatureKey = 'products';
export const likesFeatureKey = 'likes';
export const likesByUserFeatureKey = 'likesByUser';

export interface ProductState {
  products: Product[];
  likes: Like;
  likesByUser: Like[];
  categories: Category[];
  productsFilter: Product[];
}

export const initialProductsState: ProductState = {
  products: [],
  likes: {
    id: 0,
    user_id: 0,
    product_id: 0,
    kind: '',
  },
  likesByUser: [],
  categories: [],
  productsFilter: [],
};

export const productReducer = createReducer(
  initialProductsState,
  on(ProductAction.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
    };
  }),
  on(ProductAction.loadCategoriesSuccess, (state, action): ProductState => {
    return {
      ...state,
      categories: action.categories,
    };
  }),
  on(ProductAction.loadLikeProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      likes: action.likesPerProduct,
    };
  }),
  on(ProductAction.likeProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      likes: action.likesPerProductResp.data,
    };
  }),
  on(ProductAction.loadLikesByUserSuccess, (state, action): ProductState => {
    return {
      ...state,
      likesByUser: action.productsWithLike,
    };
  }),
  on(ProductAction.loadProductsFilterSuccess, (state, action): ProductState => {
    return {
      ...state,
      productsFilter: action.productsFilter,
    };
  })
);
