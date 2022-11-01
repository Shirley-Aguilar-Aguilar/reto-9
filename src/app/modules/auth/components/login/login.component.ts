/* eslint-disable @ngrx/no-typed-global-store */
// import * as fromActions from '../../store/auth.actions';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { UserLogin } from '../../../../shared/interfaces/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { AuthActions } from '../../store/action-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  form: FormGroup;
  loading: boolean = false;
  error: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  storeToken(response: string): void {
    localStorage.setItem('token', response);
  }

  login(user: UserLogin): void {
    this.authService
      .login(user)
      .pipe(
        tap((user) => {
          this.store.dispatch(AuthActions.login({ user }));
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (response) => {
          this.error = '';
          localStorage.removeItem('products');
          this.storeToken(response.data.token);
          this.router.navigate(['home']);
        },
        error: (error) => {
          this.error = error;
        },
      });
  }

  submit(): void {
    this.loading = true;
    this.error = '';
    if (this.form.valid) {
      const data = {
        data: this.form.value,
      };
      this.login(data);
    }
  }
}
