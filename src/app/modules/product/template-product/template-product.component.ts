/* eslint-disable @ngrx/no-typed-global-store */

import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductAction } from '../store/product-action-types';
import * as productSelector from '../store/product.selectors'
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-template-product',
  templateUrl: './template-product.component.html',
  styleUrls: ['./template-product.component.scss']
})
export class TemplateProductComponent implements OnInit {
  newProduct:Product;
  count = 0;
  @Input() set product(value:Product){
    this.newProduct = value;
    this.count= value.likes_up_count
  }
  dislike = true;


  constructor(
    private store: Store<AppState>,
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    const data = {
      "user_id_eq": 6,
      "product_id_eq": 12,
    }
    this.productService.getLikes(3,25)
    .subscribe({
      next:(data) => {
        console.log(data)
      },
      error (error){
        console.log("likes----", error)
      }

    })
  }

  addCount(){
    this.dislike = !this.dislike;
    if(this.dislike){
      !this.dislike;
      this.count --;
    }else {
      this.count ++;
    }
    this.store.dispatch(ProductAction.loadLikeProduct())
    console.log(this.count)
  }
}
