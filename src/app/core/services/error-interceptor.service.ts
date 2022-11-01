import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private AuthService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = this.AuthService.getToken();
    const reqClone = request.clone({ headers });

    return next.handle(reqClone).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        console.log('dentro de error interceptor');
        console.log(error);

        let errorMessage = '';
        const jwtHelper: JwtHelperService = new JwtHelperService();
        const token = localStorage.getItem('token');

        if (error.status === 401) {
          if (token && jwtHelper.isTokenExpired(token)) {
            errorMessage = `Error Code: ${error.status}\nMessage: token is invalid`;
          }
          errorMessage = `Error Code: ${error.status}\nMessage: Your credentials are invalid`;
        } else {
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
        }

        return throwError(() => errorMessage);
      })
    );
  }
}
