import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyProductComponent } from './components/body-product/body-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';
import { BodyProductRoutingModule } from './body-product-routing.module';
import { TemplateProductComponent } from './components/template-product/template-product.component';
import { StoreModule } from '@ngrx/store';
import * as fromProduct from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/product.effects';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductsResolver } from './store/product.resolver';
import { CategoryResolver } from './store/category.resolver';

@NgModule({
  declarations: [BodyProductComponent, TemplateProductComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BodyProductRoutingModule,
    FormsModule,

    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    SharedModule,

    StoreModule.forFeature(
      fromProduct.productFeatureKey,
      fromProduct.productReducer
    ),
    EffectsModule.forFeature([ProductEffects]),
  ],
  providers: [ProductService, ProductsResolver, CategoryResolver],
})
export class ProductModule {}
