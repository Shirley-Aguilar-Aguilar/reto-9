import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { miReducer } from './app.reducer';
import { environment } from '../environments/environment';
import { AuthModule } from './modules/auth/auth.module';
import { reducers, metaReducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),

    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

   // AuthModule.forRoot()
   //StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
   //StoreModule.forRoot({}, {})
 /*    StoreModule.forRoot({
      mensaje: miReducer
    }), */
