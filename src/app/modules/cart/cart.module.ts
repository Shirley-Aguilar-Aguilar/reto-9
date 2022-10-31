import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyCartComponent } from './components/body-cart/body-cart.component';
import { CartRoutingModule } from './cart.routing.module';
import { ProductService } from 'src/app/core/services/product.service';
import { StoreModule } from '@ngrx/store';
import * as fromCart from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './store/cart.effects';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [BodyCartComponent],
  imports: [
    CommonModule,
    CartRoutingModule,

    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,

    StoreModule.forFeature(
      fromCart.cartFeatureKey,
      fromCart.productReducer,
      {}
    ),
    EffectsModule.forFeature([CartEffects]),
  ],
  providers: [ProductService],
})
export class CartModule {}
