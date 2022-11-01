/* eslint-disable @ngrx/no-typed-global-store */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CategorytResp,
  IdsForLike,
  Products,
  LikeBodyPost,
  LikeBodyResp,
  Page,
} from '../../shared/interfaces/product';

@Injectable()
export class ProductService {
  host: string = environment.urlApi;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategorytResp> {
    return this.http.get<CategorytResp>(this.host + '/categories');
  }

  getProducts(): Observable<Products> {
    return this.http.get<Products>(this.host + '/products', {
      params: {
        include: `image_attachment.blob,category,master`,
        sort: 'name asc',
      },
    });
  }

  getLikes(data: IdsForLike): Observable<any> {
    return this.http.get(
      this.host +
        '/likes' +
        `?[filter][user_id_eq]=${data['user_id_eq']}&[filter][product_id_eq]=${data['product_id_eq']}`
    );
  }

  getLikesByUser(id: number): Observable<any> {
    return this.http.get(this.host + '/likes' + `?[filter][user_id_eq]=${id}`);
  }

  postLike(data: LikeBodyPost): Observable<LikeBodyResp> {
    return this.http.post<LikeBodyResp>(this.host + '/likes', data);
  }

  getFilterProductByCategory(slug: string): Observable<Products> {
    return this.http.get<Products>(
      this.host +
        '/products' +
        `?include=category,master&filter[category_slug_eq]=${slug}`
    );
  }

  searchProductsByName(name: string): Observable<Products> {
    return this.http.get<Products>(
      this.host +
        '/products' +
        `?include=category,master&filter[name_eq]=${name}`
    );
  }

  getProductsByPageSize(page: Page): Observable<Products> {
    return this.http.get<Products>(
      this.host +
        '/products' +
        `?include=category,master&page[size]=${page.size}`
    );
  }
}
