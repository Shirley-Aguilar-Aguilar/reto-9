import { createAction, props } from '@ngrx/store';
import { User } from '../../../shared/interfaces/user';

export const login = createAction(
  '[Login Page] User Login',
  props<{ user: User }>()
);
export const loginSuccess = createAction(
  '[Login Page] User Login Success',
  props<{ user: User }>()
);

export const logout = createAction('[top Menu] Logout');

export const logoutSuccess = createAction('[top Page] User Logout Success');
