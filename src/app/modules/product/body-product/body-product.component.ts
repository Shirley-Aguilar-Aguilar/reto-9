import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/interfaces/product';


@Component({
  selector: 'app-body-product',
  templateUrl: './body-product.component.html',
  styleUrls: ['./body-product.component.scss']
})
export class BodyProductComponent implements OnInit {

  categories: Product[];
  textInput = new FormControl('',[Validators.required]);

  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.getCategories();

    this.textInput.valueChanges
    .pipe( debounceTime(500), distinctUntilChanged())
    .subscribe((term) => {
       console.log(term)
    })
  }

  getCategories(){
    this.product.getCategories()
    .subscribe({
      next: (data) => {
         console.log(data.data);
         this.categories = data.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
