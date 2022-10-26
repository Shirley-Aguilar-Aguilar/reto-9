import { Component } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
// import { UserToLogin } from 'src/app/shared/interfaces/user';
// import { UserToken } from '../../../../shared/interfaces/user';
import { Router } from '@angular/router';
//import { AuthService } from 'src/app/core/services/auth.service';

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
   // private authService: AuthService,
    private router: Router
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

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

  storeToken(response: any): void {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

/*   login(data: UserToLogin): void {
    this.authService.postLogin(data).subscribe({
      next: (response) => {
        this.error = '';
        this.storeToken(response);
        this.router.navigate(['home']);
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.error = error;
        this.loading = false;
      },
    });
  } */

  submit(): void {
    this.loading = true;
    this.error = '';
    if (this.form.valid) {
     // this.login(this.form.value);
    }
  }
}
