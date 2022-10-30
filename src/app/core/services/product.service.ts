/* eslint-disable @ngrx/no-typed-global-store */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CategorytResp,
  IdsForLike,
  Products,
  LikeBodyPost,
  LikeBodyResp,
} from '../../shared/interfaces/product';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class ProductService {
  host: string = environment.urlApi;

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  //headerDefault = new HttpHeaders({'Authorization': this.apiKey,});

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
  //modificar mas adelante-----
  getFilterProductByCategory(slug: string): Observable<Products> {
    return this.http.get<Products>(
      this.host +
        '/products' +
        `?include=category&filter[category_slug_eq]=${slug}`
    );
  }

  searchProductsByName(name: string): Observable<Products> {
    return this.http.get<Products>(
      this.host + '/products' + `?include=category&filter[name_eq]=${name}`
    );
  }
}
