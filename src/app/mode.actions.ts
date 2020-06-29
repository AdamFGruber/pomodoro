import { Action } from '@ngrx/store';

export enum ModeActionTypes {
  START = '[Mode] Start',
  STOP = '[Mode] Stop',
  SWAP = '[Mode] Swap',
}

export class Start implements Action {
  readonly type = ModeActionTypes.START;
}

export class Stop implements Action {
  readonly type = ModeActionTypes.STOP;
}

export class Swap implements Action {
  readonly type = ModeActionTypes.SWAP;
}

export type ModeActionsUnion = Start | Stop | Swap;