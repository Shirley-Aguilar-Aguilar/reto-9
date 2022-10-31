import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './error-message/error-message.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ErrorMessageComponent],
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  providers: [],
  exports: [ErrorMessageComponent],
})
export class SharedModule {}
