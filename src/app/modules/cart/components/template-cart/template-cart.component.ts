import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PayloadUpdateProduct } from 'src/app/shared/interfaces/cart';

@Component({
  selector: 'app-template-cart',
  templateUrl: './template-cart.component.html',
  styleUrls: ['./template-cart.component.scss'],
})
export class TemplateCartComponent {
  product: any;
  quantity: number;

  @Input() set productCart(value: any) {
    this.product = value;
    this.quantity = this.product.quantity;
  }
  @Output() changeQty: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  emitNewPrice(input: HTMLInputElement) {
    console.log(input.value);
    this.quantity = parseInt(input.value);
    const obj = [
      {
        _destroy: true,
        id: this.product.id,
      },
      {
        product_variant_id: this.product.product_variant_id,
        quantity: this.quantity,
      },
    ];

    this.changeQty.emit(obj);
  }
}
