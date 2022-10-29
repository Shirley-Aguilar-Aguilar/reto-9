import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyProductComponent } from './body-product/body-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';
import { BodyProductRoutingModule } from './body-product-routing.module';
import { TemplateProductComponent } from './template-product/template-product.component';
import { StoreModule } from '@ngrx/store';
import * as fromProduct from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/product.effects';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    BodyProductComponent,
    TemplateProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BodyProductRoutingModule,

    MatIconModule,


    StoreModule.forFeature(fromProduct.productFeatureKey, fromProduct.productReducer),
    EffectsModule.forFeature([ProductEffects]),
  ],
  providers: [ProductService]
})
export class ProductModule { }
