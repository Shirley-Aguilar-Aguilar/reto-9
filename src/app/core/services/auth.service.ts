import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getToken() {
    let token = '';
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
    token = tokenFromStorage;
    } else {
    token = '';
    }
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }


}
