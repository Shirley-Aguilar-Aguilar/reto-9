/* eslint-disable @ngrx/prefer-effect-callback-in-block-statement */
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from "rxjs";
import { AuthActions } from "./action-types";
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
  this.actions$
  .pipe(
    ofType(AuthActions.login),
    tap(action => localStorage.setItem('user', JSON.stringify(action.user)))
  ),
  {dispatch: false});

  logouts$ = createEffect(() =>
  this.actions$
  .pipe(
    ofType(AuthActions.logout),
    tap(action => {
      console.log("removiendo")
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      this.router.navigateByUrl('/auth/login')
    })
  ),
  {dispatch: false});


  constructor(
    private actions$: Actions,
    private router: Router

    ){}
}
