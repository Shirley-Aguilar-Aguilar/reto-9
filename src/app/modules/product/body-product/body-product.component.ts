/* eslint-disable @ngrx/no-typed-global-store */

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, EMPTY, filter } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { Category, Like, Product } from 'src/app/shared/interfaces/product';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { ProductAction } from '../store/product-action-types';
import * as productSelector from '../store/product.selectors';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-body-product',
  templateUrl: './body-product.component.html',
  styleUrls: ['./body-product.component.scss'],
})
export class BodyProductComponent implements OnInit {
  products$: Observable<Product[]>;
  likesPerProduct$: Observable<Like[]>;
  categories: Category[];
  textInput = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  categorySelected: Category;
  productosSearch: Product[];

  constructor(
    private product: ProductService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProductsToShow();

    this.textInput.valueChanges
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        switchMap((value) => {
          if (value) {
            return this.transformNameToSlug(value);
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe((product) => {
        console.log(product);
        this.store.dispatch(
          ProductAction.searchProducts({ name: product.name })
        );
      });

    // pendiente ------- likes by user

    this.store.dispatch(
      ProductAction.loadLikesByUser({ id: this.getIdUser() })
    );

    /*     this.likesPerProduct$ = this.store.select(
      productSelector.selectLikesByUser
    ); */
    console.log('aquiiii observable ojala tenga datos', this.likesPerProduct$);
    // pendiennnteeeee--------
  }

  getCategories() {
    this.product.getCategories().subscribe({
      next: (data) => {
        console.log(data.data);
        this.categories = data.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getProductsToShow() {
    this.store.dispatch(ProductAction.loadProducts());
    this.products$ = this.store.select(productSelector.selectProducts);
  }

  getIdUser() {
    let user = localStorage.getItem('user');
    let userResp;
    if (user) {
      userResp = JSON.parse(user);
      return userResp.data.user.id;
    } else {
      return 0;
    }
  }

  transformNameToSlug(input: string) {
    const input2 = input.toLowerCase();
    this.store
      .select(productSelector.selectProducts)
      .pipe()
      .subscribe({
        next: (data) => {
          this.productosSearch = data.filter((data) =>
            data.name.toLowerCase().includes(input2)
          );
        },
      });
    return this.productosSearch;
  }

  filterByCategory() {
    this.store.dispatch(
      ProductAction.loadFilterProducts({
        idCategory: this.categorySelected.slug,
      })
    );
  }
}
