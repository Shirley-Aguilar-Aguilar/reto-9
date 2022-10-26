import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
/*     const jwtHelper: JwtHelperService = new JwtHelperService();
    const token = localStorage.getItem('accessToken');
    if (token && !jwtHelper.isTokenExpired(token)) {
      this.redirect();
      return false;
    } */
    return true;
  }

  private redirect(): void {
    this.router.navigate(['/home']);
  }

}
