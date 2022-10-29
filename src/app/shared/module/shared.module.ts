import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  declarations: [
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,

    ReactiveFormsModule,
  ],
  providers: [],
  exports: [ErrorMessageComponent]
})
export class SharedModule {}
