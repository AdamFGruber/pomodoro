import { Action } from '@ngrx/store';

export enum TimesActionTypes {
  SET = '[Times] Set',
  RESET = '[Times] Reset',
}

export class Set implements Action {
  readonly type = TimesActionTypes.SET;

  constructor(public payload: [number, number]) { }
}

export class Reset implements Action {
  readonly type = TimesActionTypes.RESET;
}

export type TimesActionsUnion = Set | Reset;