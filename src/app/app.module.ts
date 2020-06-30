import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { modeReducer } from './mode.reducer';
import { timesReducer } from './times.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ModeEffects } from './mode.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ mode: modeReducer, times: timesReducer }),
    EffectsModule.forRoot([ModeEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
