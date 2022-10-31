/* eslint-disable @ngrx/no-typed-global-store */
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CartState } from '../../store/reducers/index';
import {
  Cart,
  payloadCreateCart,
  ProductLocal,
} from 'src/app/shared/interfaces/cart';
import { CartActions } from '../../store/action-types';
import { Observable, tap } from 'rxjs';
import * as cartSelector from '../../store/cart.selectors';
import {
  PayloadUpdateProduct,
  ProductDescription,
} from '../../../../shared/interfaces/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body-cart',
  templateUrl: './body-cart.component.html',
  styleUrls: ['./body-cart.component.scss'],
})
export class BodyCartComponent implements OnInit {
  resultErrorCreateCart$: Observable<any>;
  resultCorrectCreateCart$: Observable<Cart | undefined>;
  productDescription: ProductDescription[];
  priceTotal: number;

  constructor(private store: Store<CartState>, private router: Router) {}

  ngOnInit(): void {
    this.getProductsAndQtyFromLocal();
  }

  getProductsAndQtyFromLocal() {
    const productsLocal = localStorage.getItem('products');
    debugger;
    if (productsLocal) {
      const dataToSave = this.transformDataToSave(JSON.parse(productsLocal));
      this.createCart(dataToSave);
    }
  }

  transformDataToSave(data: ProductLocal[]) {
    const newData = data.map((product) => {
      return {
        product_variant_id: product.masterId,
        _destroy: false,
        quantity: product.quantity,
      };
    });

    return {
      data: {
        items: newData,
      },
    };
  }

  createCart(data: payloadCreateCart) {
    console.log(data);
    this.store.dispatch(CartActions.createCart({ cart: data }));

    this.resultErrorCreateCart$ = this.store.select(
      cartSelector.selectErrorMessage
    );
    this.getCart();
  }

  getCart() {
    this.resultCorrectCreateCart$ = this.store.select(cartSelector.selectCard);
    return this.resultCorrectCreateCart$;
  }

  changeQty(payload: PayloadUpdateProduct) {
    const payloadUpdateProduct = {
      data: {
        items: payload,
      },
    };
    this.store.dispatch(CartActions.updateCart({ cart: payloadUpdateProduct }));
    this.store.select(cartSelector.selectCard).pipe(
      tap((data) => {
        console.log(data);
      })
    );
  }

  get getTotalPrice() {
    this.resultCorrectCreateCart$.subscribe((data) => {
      if (data) {
        this.priceTotal = data?.data.items
          .map((product) => product.quantity * parseInt(product.price))
          .reduce(
            (priceAnt: number, priceLast: number) => priceAnt + priceLast
          );

        return this.priceTotal;
      }
      return this.priceTotal;
    });
    return this.priceTotal;
  }

  saveOrder() {
    this.router.navigate(['home']);
    this.store.dispatch(CartActions.deletecart());
    localStorage.removeItem('products');
  }
}
