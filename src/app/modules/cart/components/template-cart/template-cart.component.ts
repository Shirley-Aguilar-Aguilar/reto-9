import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-template-cart',
  templateUrl: './template-cart.component.html',
  styleUrls: ['./template-cart.component.scss'],
})
export class TemplateCartComponent implements OnInit {
  product: any;
  quantity: number;

  @Input() set productCart(value: any) {
    this.product = value;
    this.quantity = this.product.quantity;
  }
  @Output() changeQty: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  emitNewPrice(input: HTMLInputElement) {
    console.log(input.value);
    this.quantity = parseInt(input.value);
    this.changeQty.emit(this.quantity);
  }
}
