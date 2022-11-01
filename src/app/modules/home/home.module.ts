import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentHomeComponent } from './components/content-home/content-home.component';
import { AppRoutingHomeModule } from './home-routing.module';
import { HeaderHomeComponent } from './components/header-home/header-home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductService } from 'src/app/core/services/product.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContentHomeComponent, HeaderHomeComponent],
  imports: [
    CommonModule,
    AppRoutingHomeModule,
    ReactiveFormsModule,

    MatIconModule,
    MatToolbarModule,
  ],
  providers: [ProductService],
})
export class HomeModule {}
