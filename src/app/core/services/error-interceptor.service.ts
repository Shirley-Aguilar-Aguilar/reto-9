import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, switchMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(
    private AuthService: AuthService,
    ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = this.AuthService.getToken();
    // console.log("headers")
    //console.log(headers)
    const reqClone = request.clone({ headers });

    return next.handle(reqClone).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        console.log("dentro de error interceptor")
        return throwError(() => error);
      })
    )
  }
}
