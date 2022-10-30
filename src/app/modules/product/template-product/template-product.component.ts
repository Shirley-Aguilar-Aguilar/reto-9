/* eslint-disable @ngrx/no-typed-global-store */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductAction } from '../store/product-action-types';
import * as productSelector from '../store/product.selectors'
import { ProductService } from '../../../core/services/product.service';
import { Like } from '../../../shared/interfaces/product';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-template-product',
  templateUrl: './template-product.component.html',
  styleUrls: ['./template-product.component.scss']
})
export class TemplateProductComponent implements OnInit {
  newProduct:Product;
  count = 0;
  dislike = true;
  likesPerProduct$:Observable<Like[]>;

  @Input() set product(value:Product){
    this.newProduct = value;
    this.count= value.likes_up_count
  }

  @Output() updateProductsOfService: EventEmitter<boolean>= new EventEmitter<boolean>()



  constructor(
    private store: Store<AppState>,
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.getIdUser();

  }

  getIdUser(){
    let user= localStorage.getItem('user');
    let userResp;
    if(user){
      userResp = JSON.parse(user);
      //this.userId = userResp.data.user.id;
      return userResp.data.user.id;
    }else {
     return ''
    }
  }

  addCount(idProduct:number){
    const data = {
      user_id_eq:this.getIdUser(),
      product_id_eq:idProduct,
    }
    this.store.dispatch(ProductAction.loadLikesProduct({idsPerProduct:data}))

    this.dislike = !this.dislike;
    if(this.dislike){
      !this.dislike;
      this.count --;
      const like = {
        data: {
          product_id: idProduct,
          kind: 'down'
         }
      }


     this.store.dispatch(ProductAction.dislikeProduct({bodyLikePerProduct: like}))

    }else {
      console.log("ennn else")
      this.count ++;
      const like = {
        data: {
          product_id: idProduct,
          kind: 'up'
         }
      }
      this.store.dispatch(ProductAction.likeProduct({bodyLikePerProduct: like}))

    }
    setTimeout(() => {
      this.updateProductsOfService.emit(true);
    }, 500)

    console.log(this.count)
  }
}
