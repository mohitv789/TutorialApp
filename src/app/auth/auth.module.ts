import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {MatCardModule} from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { StoreModule } from '@ngrx/store';
import {AuthService} from "./auth.service";
import * as fromAuth from './reducers';
import {authReducer} from './reducers';
import {AuthGuard} from './auth.guard';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth.effects';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        RouterModule.forChild([
          {path: 'login', component: LoginComponent},
          {path: 'signup', component: SignupComponent},
          {path: 'profile', component: ProfileComponent},
        ]),
        StoreModule.forFeature('auth', authReducer),
        EffectsModule.forFeature([AuthEffects])
    ],
    declarations: [LoginComponent,SignupComponent,ProfileComponent],
    exports: [LoginComponent,SignupComponent,ProfileComponent]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
              AuthService,
                AuthGuard
            ]
        }
    }
}
