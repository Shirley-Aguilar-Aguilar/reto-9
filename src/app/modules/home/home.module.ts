import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentHomeComponent } from './components/content-home/content-home.component';
import { AppRoutingHomeModule } from './home-routing.module';



@NgModule({
  declarations: [
    ContentHomeComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingHomeModule
  ]
})
export class HomeModule { }
