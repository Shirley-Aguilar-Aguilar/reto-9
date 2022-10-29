/* eslint-disable @ngrx/no-typed-global-store */

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { Category, Product } from 'src/app/shared/interfaces/product';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { ProductAction } from '../store/product-action-types';
import * as productSelector from '../store/product.selectors'

@Component({
  selector: 'app-body-product',
  templateUrl: './body-product.component.html',
  styleUrls: ['./body-product.component.scss']
})
export class BodyProductComponent implements OnInit {
  products$:Observable<Product[]>;
  categories: Category[];
  textInput = new FormControl('',[Validators.required]);

  constructor(
    private product: ProductService,
    private store: Store<AppState>,
    ) { }


  ngOnInit(): void {
    this.getCategories();

    this.textInput.valueChanges
    .pipe( debounceTime(500), distinctUntilChanged())
    .subscribe((term) => {
       console.log(term)
    })


    this.store.dispatch(ProductAction.loadProducts())
    this.products$ = this.store.select(productSelector.selectProducts);
  }

  getCategories(){
    this.product.getCategories()
    .subscribe({
      next: (data) => {
         console.log(data.data);
         this.categories = data.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  updateProductsOfService(result:boolean){
    console.log("event------------for update")
    console.log(result);
   this.store.dispatch(ProductAction.loadProducts())
   this.products$ = this.store.select(productSelector.selectProducts);
  }

}
