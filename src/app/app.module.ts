import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ShoppingReducer } from './store/reducers/shopping.reducer';
import { ShoppingEffects } from './store/effects/shopping.effects';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      shopping: ShoppingReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([ShoppingEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
