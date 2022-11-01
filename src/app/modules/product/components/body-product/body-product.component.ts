/* eslint-disable @ngrx/no-typed-global-store */

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, EMPTY, filter } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { Category, Like, Product } from 'src/app/shared/interfaces/product';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { ProductAction } from '../../store/product-action-types';
import * as productSelector from '../../store/product.selectors';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-body-product',
  templateUrl: './body-product.component.html',
  styleUrls: ['./body-product.component.scss'],
})
export class BodyProductComponent implements OnInit {
  products$: Observable<Product[]>;
  likesPerProduct$: Observable<Like[]>;
  categories$: Observable<Category[]>;
  categorySelected: Category;
  productosSearch: Product[];
  error: string;
  pageEvent: PageEvent;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  length = 100;

  textInput = new FormControl('', [Validators.required]);

  constructor(
    private product: ProductService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProductsToShow();

    this.textInput.valueChanges
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        switchMap((value) => {
          if (!value) {
            this.getProductsToShow();
          }
          if (value) {
            return this.transformNameToSlug(value);
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe((product) => {
        console.log(product);
        this.getProductsToShow();
        this.store.dispatch(
          ProductAction.searchProducts({ name: product.name })
        );
      });

    this.store.dispatch(
      ProductAction.loadLikesByUser({ id: this.getIdUser() })
    );
  }

  getCategories() {
    this.categories$ = this.store.select(productSelector.selectCategories);
  }

  getProductsToShow() {
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

  validateNavigation() {
    this.error = '';
    const localProducts = localStorage.getItem('products');
    if (localProducts) {
      this.router.navigate(['home/cart']);
    } else {
      this.error = 'Shopping cart is empty';
    }
  }
  page($event: any) {
    console.log($event);
    console.log('vvvvvvvvvvvvvvvvv');
    console.log(this.pageSize); //productos--peticion
    console.log(this.length); //cantidad total
    const page = {
      size: this.pageSize,
      number: 0,
    };
    this.store.dispatch(ProductAction.loadPageSize({ page }));
    const localLength = localStorage.getItem('length-products');
    this.length = localLength ? JSON.parse(localLength) : 100;
    this.getProductsToShow();
  }
}
