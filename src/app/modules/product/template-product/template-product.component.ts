/* eslint-disable @ngrx/no-typed-global-store */

import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductAction } from '../store/product-action-types';
import * as productSelector from '../store/product.selectors'

@Component({
  selector: 'app-template-product',
  templateUrl: './template-product.component.html',
  styleUrls: ['./template-product.component.scss']
})
export class TemplateProductComponent  {
  newProduct:Product;
  count = 0;
  @Input() set product(value:Product){
    this.newProduct = value;
    this.count= value.likes_up_count
  }
  dislike = true;


  constructor(
    private store: Store<AppState>,
  ) { }

  addCount(){
    this.dislike = !this.dislike;
    if(this.dislike){
      !this.dislike;
      this.count --;
    }else {
      this.count ++;
    }

    console.log(this.count)
  }
}
