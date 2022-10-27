// import { environment } from './../../../../../environments/environment';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

export const authFeatureKey = 'auth';

export interface State {

}

export const reducers: ActionReducerMap<State> = {

};


//export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
