import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyCartComponent } from './components/body-cart/body-cart.component';

const routes: Routes = [
  {
    path: '',
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
