import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects'
import { ModeActionTypes } from './mode.actions'
import { Observable } from 'rxjs';

@Injectable()
export class ModeEffects {
  @Effect({ dispatch: false })
  start$: Observable<Action> = this.actions$.pipe(
    ofType(ModeActionTypes.START)
  );
  constructor(private actions$: Actions) { }
}