/* eslint-disable @ngrx/no-typed-global-store */
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ProductService } from '../../../core/services/product.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-template-product',
  templateUrl: './template-product.component.html',
  styleUrls: ['./template-product.component.scss']
})
export class TemplateProductComponent implements OnInit {
  products: Product[];
  constructor(
    private product: ProductService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
   this.getProducts();
  }

  getProducts(){
    this.product.getProducts()
    .pipe(
      tap(products => {
        console.log(products);
       //this.store.dispatch(ProductActions.login({products}))
      })
    )
    .subscribe({
      next:(data) => {
        this.products = data.data;
        console.log(data)
      },
      error:(error) => {
        console.log(error)
      }
    })
  }
}
