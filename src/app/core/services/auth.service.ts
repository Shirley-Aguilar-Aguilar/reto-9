import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin, User } from '../../shared/interfaces/user';

@Injectable()

export class AuthService {

  host:string = environment.urlApi;
  _auth: User;
  _refreshToken:string;

  constructor(
    private http:HttpClient,
  ) { }

/*   get auth(): UserToken {
   return {...this._auth}
  } */

  login(data:UserLogin):Observable<User> {
    return this.http.post<User>(this.host +"/v1/users/login", data)
            .pipe(
              tap(auth => this._auth = auth)
            )
  }

/*   logout():void {
   localStorage.removeItem('accessToken');
   localStorage.removeItem('refreshToken');
  } */

/*   getRefreshToken():{refreshToken: string}{
    const refreshTokenFromStorage =  localStorage.getItem('refreshToken');
    if(refreshTokenFromStorage){
      this._refreshToken = refreshTokenFromStorage;
    }else {
      this._refreshToken = ""
    }
    return {'refreshToken':this._refreshToken};
  }

  refreshToken():Observable<UserToken>{
    const refreshToken = this.getRefreshToken();
    return this.http.post<UserToken>(this.host +"/auth/refresh", refreshToken);
  } */
}
