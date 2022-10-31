import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Cart,
  ProductPayload,
  payloadCreateCart,
} from 'src/app/shared/interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  host: string = environment.urlApi;
  constructor(private http: HttpClient) {}

  deleteCart(): Observable<any> {
    return this.http.delete<any>(this.host + '/cart');
  }
  createCart(data: payloadCreateCart): Observable<Cart> {
    return this.http.post<Cart>(this.host + '/cart', data);
  }
}
