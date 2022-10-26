import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
//import { AuthService } from '../services/auth.service';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanLoad {
  constructor(
    private router: Router,
  ) {}
/*   constructor(
    private router: Router,
    private authService: AuthService
  ) {} */

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
/*     const token = localStorage.getItem('accessToken');
    if (this.authService.auth.accessToken) {
      return true;
    } else if (token) {
      const jwtHelper: JwtHelperService = new JwtHelperService();
      return jwtHelper.isTokenExpired(token) ? false : true;
    } else {
      this.redirect();
      return false;
    } */

    return true;
  }


  private redirect(): void {
    this.router.navigate(['/']);
  }

}
