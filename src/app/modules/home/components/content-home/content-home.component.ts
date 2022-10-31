import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductService } from '../../../../core/services/product.service';
import { Category } from '../../../../shared/interfaces/product';

@Component({
  selector: 'app-content-home',
  templateUrl: './content-home.component.html',
  styleUrls: ['./content-home.component.scss'],
})
export class ContentHomeComponent {
  constructor() {}
}
