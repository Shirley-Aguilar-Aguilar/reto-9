import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../shared/interfaces/user';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {

  dataProfile: User;
 // nameObject: Name;
  initialsFullName: string;
  idUser: string;
  error:string;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUserId();
   // this.getProfileUser();
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

  }

}
