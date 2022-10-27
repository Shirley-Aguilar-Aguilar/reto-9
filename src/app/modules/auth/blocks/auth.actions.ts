import { Action, createAction, props } from '@ngrx/store';
import { UserLogin, UserDataResp } from '../../../shared/interfaces/user';

  export const ACTION_LOGIN = '[Login] User Login';


  export const login = createAction(
    "[Login Page] User Login",
    props<{user: UserDataResp}>()
  )
