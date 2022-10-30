import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategorytResp, IdsForLike, Products, LikeBodyPost, LikeBodyResp } from '../../shared/interfaces/product';


@Injectable()

export class ProductService {
  host:string = environment.urlApi;

  constructor(private http:HttpClient,
    ) { }


  //headerDefault = new HttpHeaders({'Authorization': this.apiKey,});

  getCategories():Observable<CategorytResp> {
    return this.http.get<CategorytResp>(this.host + '/categories')
  }

  getProducts():Observable<Products> {
    return this.http.get<Products>(this.host +'/products' ,{params:{include:`image_attachment.blob,category`}})
  }


  getLikes(data:IdsForLike):Observable<any> {
    return this.http.get(this.host + '/likes'+ `?[filter][user_id_eq]=${data['user_id_eq']}&[filter][product_id_eq]=${data['product_id_eq']}` );
  }

  getLikesByUser(id:number):Observable<any> {
    return this.http.get(this.host + '/likes'+ `?[filter][user_id_eq]=${id}` );
  }
//{{url}}/likes?[filter][user_id_eq]=3&[filter][product_id_eq]=25
  postLike(data:LikeBodyPost):Observable<LikeBodyResp>{
    return this.http.post<LikeBodyResp>(this.host + '/likes', data)
  }

}
