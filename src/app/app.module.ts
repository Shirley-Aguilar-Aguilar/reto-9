import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { miReducer } from './app.reducer';
import { environment } from '../environments/environment';
import { AuthModule } from './modules/auth/auth.module';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer, RouterState } from '@ngrx/router-store';
import { ErrorInterceptorService } from './core/services/error-interceptor.service';
import { AuthService } from './core/services/auth.service';

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

    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability:true,
        strictActionImmutability:true,
        strictActionSerializability: true,
        strictStateSerializability:true
      }
    }),

    !environment.production ? StoreDevtoolsModule.instrument() : [],

    EffectsModule.forRoot([]),

    StoreRouterConnectingModule.forRoot({
       stateKey: 'router',
       routerState: RouterState.Minimal
    })

  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

   // AuthModule.forRoot()
   //StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
   //StoreModule.forRoot({}, {})
 /*    StoreModule.forRoot({
      mensaje: miReducer
    }), */
