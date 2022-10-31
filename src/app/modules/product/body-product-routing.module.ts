import { BodyProductComponent } from './components/body-product/body-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BodyProductComponent,
  },
  {
    path: 'cart',
    loadChildren: () => import('../cart/cart.module').then((m) => m.CartModule),
    //canLoad: [HomeGuard],
  },
  /*   {
    path: '**',
    redirectTo: '',
  }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodyProductRoutingModule {}
