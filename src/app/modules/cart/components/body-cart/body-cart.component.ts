/* eslint-disable @ngrx/no-store-subscription */
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
import { ProductDescription } from '../../../../shared/interfaces/cart';
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
  priceTotal = 0;

  constructor(private store: Store<CartState>, private router: Router) {}

  ngOnInit(): void {
    this.getProductsAndQtyFromLocal();
  }

  getProductsAndQtyFromLocal() {
    const productsLocal = localStorage.getItem('products');
    // debugger;
    if (productsLocal) {
      console.log('data productsLocal save', productsLocal);
      const dataToSave = this.transformDataToSave(JSON.parse(productsLocal));
      console.log('data to save', dataToSave);
      this.createCart(dataToSave);
    }
  }

  transformDataToSave(data: ProductLocal[]) {
    console.log(data);
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

  changeQty(payload: any) {
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
      console.log(data);
      if (data) {
        this.priceTotal = data?.data.items
          .map((product) => {
            console.log(
              product.quantity,
              parseFloat(product.price),
              product.price
            );
            return product.quantity * parseFloat(product.price);
          })
          .reduce(
            (priceAnt: number, priceLast: number) => priceLast + priceAnt
          );

        return this.priceTotal;
      }
      return this.priceTotal;
    });
    return this.priceTotal;
  }

  deleteAndNavigate() {
    this.router.navigate(['/home']);
    this.store.dispatch(CartActions.deleteCart());
    localStorage.removeItem('products');
  }

  saveOrder() {
    this.deleteAndNavigate();
  }

  handlerError() {
    this.deleteAndNavigate();
  }

  changePriceGeneral(price: number) {
    this.priceTotal = price;
  }
}
