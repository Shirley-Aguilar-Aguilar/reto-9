import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charging-message',
  template: `<div>Charging...</div>
    <mat-progress-bar mode="indeterminate"></mat-progress-bar> `,
  styleUrls: ['./charging-message.component.scss'],
})
export class ChargingMessageComponent {
  constructor() {}
}
