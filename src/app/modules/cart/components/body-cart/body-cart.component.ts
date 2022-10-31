/* eslint-disable @ngrx/no-typed-global-store */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartState } from '../../store/reducers/index';
import {
  payloadCreateCart,
  ProductLocal,
} from 'src/app/shared/interfaces/cart';
import { CartActions } from '../../store/action-types';

@Component({
  selector: 'app-body-cart',
  templateUrl: './body-cart.component.html',
  styleUrls: ['./body-cart.component.scss'],
})
export class BodyCartComponent implements OnInit {
  constructor(private store: Store<CartState>) {}

  ngOnInit(): void {
    this.store.dispatch(CartActions.deletecart());
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
    // eliminar cart existente
    console.log(data);
    this.store.dispatch(CartActions.createCart({ cart: data }));

    // crear la car

    // actualizar la cart
    console.log('formato de data a guardar ');
    console.log(data);
  }
}
