import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyProductComponent } from './body-product/body-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';
import { BodyProductRoutingModule } from './body-product-routing.module';
import { TemplateProductComponent } from './template-product/template-product.component';



@NgModule({
  declarations: [
    BodyProductComponent,
    TemplateProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BodyProductRoutingModule

  ],
  providers: [ProductService]
})
export class ProductModule { }
