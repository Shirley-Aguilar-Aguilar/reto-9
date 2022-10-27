import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { HeaderProfileComponent } from './components/header-profile/header-profile.component';
import { ContentHomeComponent } from './components/content-home/content-home.component';

const routes: Routes = [
  {
    path: '',
    component: ContentHomeComponent,
    title: 'Home',
    // children: [{ path: '', component: ContentHomeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingHomeModule {}
