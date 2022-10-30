import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyProductComponent } from './body-product/body-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';
import { BodyProductRoutingModule } from './body-product-routing.module';
import { TemplateProductComponent } from './template-product/template-product.component';
import { StoreModule } from '@ngrx/store';
import * as fromProduct from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/product.effects';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/core/services/auth.service';



@NgModule({
  declarations: [
    BodyProductComponent,
    TemplateProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BodyProductRoutingModule,
    FormsModule,

    MatIconModule,


    StoreModule.forFeature(fromProduct.productFeatureKey, fromProduct.productReducer),
    StoreModule.forFeature(fromProduct.likesFeatureKey, fromProduct.likesReducer),
    StoreModule.forFeature(fromProduct.likesByUserFeatureKey, fromProduct.likesByUserReducer),
    EffectsModule.forFeature([ProductEffects]),
  ],
  providers: [ProductService

]
})
export class ProductModule { }
