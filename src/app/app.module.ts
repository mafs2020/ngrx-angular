import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RUTASPADREMODULE } from './app.routes';
import { LoginComponent } from './login/login.component';
// import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { environment } from 'src/environments/environment';

// ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { usersReducer } from './state/user.reduce';
import { UserEffects } from './state/user.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RUTASPADREMODULE,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('usuarios', usersReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([UserEffects]),
    StoreDevtoolsModule.instrument({
      name: 'APM Demo App DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
    // SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
