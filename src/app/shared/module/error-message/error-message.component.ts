import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-error-message',
  template: ``,
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  @Input() errorMessage: string;
  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.snackBar.open(this.errorMessage, 'Close', {
      duration: 2500,
      panelClass: ['red-snackbar'],
    });
  }
}
