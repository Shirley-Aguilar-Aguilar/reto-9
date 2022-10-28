import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductResp } from '../../shared/interfaces/product';

@Injectable()

export class ProductService {
  host:string = environment.urlApi;
  constructor(private http:HttpClient,) { }

  getCategories():Observable<ProductResp> {
    return this.http.get<ProductResp>(this.host + '/v1/categories')
  }
}
