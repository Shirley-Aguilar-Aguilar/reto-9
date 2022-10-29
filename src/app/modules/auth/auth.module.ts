import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargingMessageComponent } from './components/charging-message/charging-message.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/module/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { StoreModule } from "@ngrx/store";
import { AuthGuard } from '../../core/guards/auth.guard';
import * as fromAuth from './store/reducers';
import { AuthService } from '../../core/services/auth.service';
import { authReducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';


@NgModule({
  declarations: [
    ChargingMessageComponent,
    FirstPageComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,

    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,


    StoreModule.forFeature(fromAuth.authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects]),

  ],
  providers: [AuthService]
})
export class AuthModule {
/*   static forRoot(): ModuleWithProviders<AuthModule> {
    return {
        ngModule: AuthModule,
        providers: [
        //  AuthService,
            AuthGuard
        ]
    }
} */
}
