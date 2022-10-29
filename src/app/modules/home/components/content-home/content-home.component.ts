import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductService } from '../../../../core/services/product.service';
import { Category } from '../../../../shared/interfaces/product';

@Component({
  selector: 'app-content-home',
  templateUrl: './content-home.component.html',
  styleUrls: ['./content-home.component.scss']
})
export class ContentHomeComponent implements OnInit {
  categories: Category[];
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
         // console.log(data.data);
         this.categories = data.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
