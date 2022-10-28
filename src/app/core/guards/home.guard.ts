/* eslint-disable @ngrx/select-style */
/* eslint-disable @ngrx/no-typed-global-store */
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { isLoggedIn } from 'src/app/modules/auth/store/auth.selectors';
import { AppState } from 'src/app/reducers';


@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanLoad {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if(isLoggedIn) {
      return this.store
      .pipe(
         select(isLoggedIn),
         tap(loggedIn => {
           if(!loggedIn){
            this.redirect();
           }
         })
      )
    }
    return false;

  }


  private redirect(): void {
    this.router.navigate(['/']);
  }

}
