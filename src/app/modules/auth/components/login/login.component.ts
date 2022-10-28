import { Component } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { UserLogin } from '../../../../shared/interfaces/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import * as fromActions from '../../store/auth.actions';
import { AuthActions } from '../../store/action-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = "trainee4@example.com";
  password = "Trainee$4";
  hide = true;
  form: FormGroup;
  loading: boolean = false;
  error: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    // eslint-disable-next-line @ngrx/no-typed-global-store
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

  // cambiar por pipe
  getControl(controlName: string): AbstractControl {
    return this.form.get(controlName) as AbstractControl;
  }

  getErrorMessage() {
    if (this.getControl('email').hasError('required')) {
      return 'Email is required';
    } else {
      return this.getControl('email').hasError('email')
        ? 'Not a valid email'
        : '';
    }
  }
  getErrorMessagePassword() {
    if (this.getControl('password').hasError('required')) {
      return 'Password is required';
    } else {
      return this.getControl('password').hasError('minlength')
        ? `Password name should be minimum ${
            this.getControl('password').errors?.['minlength'].requiredLength
          } characters`
        : '';
    }
  }

  storeToken(response: string): void {
    localStorage.setItem('token', response);
  }

   login(user: UserLogin): void {

    this.authService.login(user)
    .pipe(
      tap(user => {
        console.log(user);
       this.store.dispatch(fromActions.login({user}))
      })
    )
    .subscribe({
      next: (response) => {
        this.error = '';
        console.log(response)
        this.storeToken(response.data.token);
        this.router.navigate(['home']);
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.error = error;
        this.loading = false;
      },
    });
  }

  submit(): void {
    this.loading = true;
    this.error = '';
    if (this.form.valid) {
      const data = {
        data: this.form.value,
      }
     this.login(data);
    }
  }
}
