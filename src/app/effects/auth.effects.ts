import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { START } from '../mode.reducer';

@Injectable()
export class AuthEffects {
  // Listen for the 'START' action
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType('START'),
    mergeMap(action => {
      console.log(action)
      return action
    })
  );

  constructor(private actions$: Actions) { }
}