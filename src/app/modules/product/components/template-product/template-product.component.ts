/* eslint-disable @ngrx/no-typed-global-store */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductAction } from '../../store/product-action-types';
import * as productSelector from '../../store/product.selectors';
import { ProductService } from '../../../../core/services/product.service';
import { Like } from '../../../../shared/interfaces/product';

@Component({
  selector: 'app-template-product',
  templateUrl: './template-product.component.html',
  styleUrls: ['./template-product.component.scss'],
})
export class TemplateProductComponent implements OnInit {
  newProduct: Product;
  countLike = 0;
  dislikeInitial: boolean;
  dislike = true;
  likesPerProduct$: Observable<Like>;
  countProduct = 0;

  @Input() set product(value: Product) {
    this.newProduct = value;
    this.countLike = value.likes_up_count;
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.getIdUser();
    this.getLikesOfUser();
  }

  getIdUser() {
    let user = localStorage.getItem('user');
    return user ? JSON.parse(user).data.user.id : '';
  }

  getLikesOfUser() {
    // this.likesPerProduct$ = this.store.select(productSelector.selectLikesByUser);
    //this.likesPerProduct$.pipe();
    /*     this.store.select(productSelector.selectLikesByUser).pipe(
      map((result) => {
        result.forEach((like) => {
          if (like.product_id === this.newProduct.id) {
            this.likesPerProduct$ = like;

          }
          return result;
        });
      })
    ); */
  }

  getPayloadLike(idProduct: number, kind: string) {
    return {
      data: {
        product_id: idProduct,
        kind: kind,
      },
    };
  }

  getLikesProduct(idProduct: number) {
    const data = {
      user_id_eq: this.getIdUser(),
      product_id_eq: idProduct,
    };
    this.store.dispatch(
      ProductAction.loadLikesProduct({ idsPerProduct: data })
    );
  }

  addCount(idProduct: number) {
    this.getLikesProduct(idProduct);
    this.dislike = !this.dislike;
    if (this.dislike) {
      !this.dislike;
      this.countLike--;
      const like = this.getPayloadLike(idProduct, 'down');
      this.store.dispatch(
        ProductAction.dislikeProduct({ bodyLikePerProduct: like })
      );
    } else {
      this.countLike++;
      const like = this.getPayloadLike(idProduct, 'up');
      this.store.dispatch(
        ProductAction.likeProduct({ bodyLikePerProduct: like })
      );
    }
  }

  isDislike() {
    return this.dislike ? 'material-icons-outlined' : '';
  }

  saveProduct(newProduct: Product) {
    const storageProduct = localStorage.getItem('products');
    let products;
    if (!storageProduct) {
      products = [];
    } else {
      products = JSON.parse(storageProduct);
    }

    const dataProducts = {
      masterId: newProduct.master.id,
      quantity: this.countProduct,
    };

    products.push(dataProducts);
    localStorage.setItem('products', JSON.stringify(products));
  }
}
