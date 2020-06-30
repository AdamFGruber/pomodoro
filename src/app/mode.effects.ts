import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Injectable()
export class ModeEffects {
  constructor(private actions$: Actions) { }

  @Effect({ dispatch: false })
  logActions$: Observable<Action> = this.actions$.pipe(tap(action => console.log(action)));
}