/* eslint-disable @ngrx/no-typed-global-store */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../shared/interfaces/user';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { map, Observable } from 'rxjs';
import { isLoggedIn, isLoggedOut } from 'src/app/modules/auth/store/auth.selectors';
import { login, logout } from 'src/app/modules/auth/store/auth.actions';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>

  dataProfile: User;
 // nameObject: Name;
  initialsFullName: string;
  idUser: string;
  error:string;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private store: Store<AppState>,

  ) {}

  ngOnInit(): void {
   const userProfile = localStorage.getItem('user');
   if(userProfile){
      this.store.dispatch(login({user:JSON.parse(userProfile)}))
   }


   this.store.subscribe(state => console.log("store value:", state))

   this.isLoggedIn$ = this.store
   .pipe(
      select(isLoggedIn)
   );

   this. isLoggedOut$ = this.store
   .pipe(
      select(isLoggedOut)
   );

  }

  getUserId() {
    this.activateRoute.paramMap.subscribe((response:any) => {
      this.idUser = <string>response.get('id');
    });


  }

/*   transformDataToShow(profile: UserProfile): void {
    this.nameObject = JSON.parse(profile.name);
    this.initialsFullName = (
      this.nameObject.firstname.charAt(0) +
      '.' +
      this.nameObject.lastname.charAt(0)
    ).toUpperCase();
  } */

/*   getProfileUser() {
    this.UserService.getProfileUser(this.idUser).subscribe({
      next: (profile) => {
        this.error = '';
        this.dataProfile = profile;
        this.transformDataToShow(profile);
      },
      error: (error) => {
        this.error = error;
      },
    });
  } */

  menuToggle(div: HTMLDivElement) {
    div.classList.toggle('active');
  }

/*   logout() {
    this.AuthService.logout();
    this.router.navigate(['/']);
  } */

  logout(){
    //localStorage.removeItem('token');
     this.store.dispatch(logout());
     this.router.navigate(['/']);
  }

}
