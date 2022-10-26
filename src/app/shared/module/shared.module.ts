import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  declarations: [
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,

    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  exports: [ErrorMessageComponent]
})
export class SharedModule {}
