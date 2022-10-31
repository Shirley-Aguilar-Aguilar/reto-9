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

@Component({
  selector: 'app-body-cart',
  templateUrl: './body-cart.component.html',
  styleUrls: ['./body-cart.component.scss'],
})
export class BodyCartComponent implements OnInit {
  resultErrorCreateCart$: Observable<any>;
  resultCorrectCreateCart$: Observable<Cart | undefined>;
  constructor(private store: Store<CartState>) {
    this.store.dispatch(CartActions.deletecart());
  }

  ngOnInit(): void {
    // eliminar cart en caso exista
    // this.store.dispatch(CartActions.deletecart());
    this.getProductsAndQtyFromLocal();
  }

  getProductsAndQtyFromLocal() {
    const productsLocal = localStorage.getItem('products');
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

    this.resultCorrectCreateCart$ = this.store.select(cartSelector.selectCard);

    // crear la car

    // actualizar la cart
    console.log('formato de data a guardar ');
    console.log(this.resultCorrectCreateCart$);
  }

  changeQty(n: number) {
    console.log('nuevo numero', n);
  }
  getTotalPrice(data: any) {
    console.log('data para calcular toda la data', data);
    return data
      .map((product: any) => {
        return product.quantity * product.price;
      })
      .reduce((priceAnt: number, priceLast: number) => priceAnt + priceLast);
  }
}
