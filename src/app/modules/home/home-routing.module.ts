import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentHomeComponent } from './components/content-home/content-home.component';

const routes: Routes = [
  {
    path: '',
    component: ContentHomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../product/product.module').then((m) => m.ProductModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingHomeModule {}
