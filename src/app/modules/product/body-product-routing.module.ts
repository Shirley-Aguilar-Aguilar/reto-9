import { BodyProductComponent } from './components/body-product/body-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsResolver } from './store/product.resolver';
import { CategoryResolver } from './store/category.resolver';

const routes: Routes = [
  {
    path: '',
    component: BodyProductComponent,
    resolve: {
      products: ProductsResolver,
      categories: CategoryResolver,
    },
  },
  {
    path: 'cart',
    loadChildren: () => import('../cart/cart.module').then((m) => m.CartModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodyProductRoutingModule {}
