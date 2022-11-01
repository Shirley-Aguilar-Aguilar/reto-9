import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartGuard } from 'src/app/core/guards/cart.guard';
import { BodyCartComponent } from './components/body-cart/body-cart.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [CartGuard],
    children: [
      {
        path: '',
        component: BodyCartComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
