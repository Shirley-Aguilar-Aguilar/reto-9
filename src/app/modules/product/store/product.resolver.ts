/* eslint-disable @ngrx/no-typed-global-store */
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, first, Observable, tap } from 'rxjs';
import { AppState } from '../../../reducers/index';
import { ProductAction } from './product-action-types';

@Injectable()
export class ProductsResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store<AppState>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(ProductAction.loadProducts());
        }
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
