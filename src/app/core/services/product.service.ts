import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategorytResp, Products } from '../../shared/interfaces/product';

@Injectable()

export class ProductService {
  host:string = environment.urlApi;
  constructor(private http:HttpClient,) { }


  //headerDefault = new HttpHeaders({'Authorization': this.apiKey,});

  getCategories():Observable<CategorytResp> {
    return this.http.get<CategorytResp>(this.host + '/categories')
  }

  getProducts():Observable<Products> {
    return this.http.get<Products>(this.host +'/products' ,{params:{include:`image_attachment.blob,category`}})
  }
}
