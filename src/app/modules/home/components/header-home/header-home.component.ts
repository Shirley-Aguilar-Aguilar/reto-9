/* eslint-disable @ngrx/select-style */
/* eslint-disable @ngrx/no-typed-global-store */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserResp } from '../../../../shared/interfaces/user';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { map, Observable } from 'rxjs';
import {
  isLoggedIn,
  isLoggedOut,
} from 'src/app/modules/auth/store/auth.selectors';
import { login, logout } from 'src/app/modules/auth/store/auth.actions';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss'],
})
export class HeaderHomeComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  user: UserResp;
  initialsName: string;
  idUser: string;
  error: string;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    const userProfile = localStorage.getItem('user');
    if (userProfile) {
      this.store.dispatch(login({ user: JSON.parse(userProfile) }));
    }

    this.getUser();
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  }

  getUser() {
    const profile = localStorage.getItem('user');
    if (profile) {
      this.user = JSON.parse(profile).data.user;
      this.transformName(this.user.name);
    }
  }

  transformName(name: string): void {
    this.initialsName = name.charAt(0).toUpperCase();
  }

  menuToggle(div: HTMLDivElement) {
    div.classList.toggle('active');
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('products');
    this.store.dispatch(logout());
    this.router.navigate(['/']);
  }
}
