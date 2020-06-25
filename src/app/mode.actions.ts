import { createAction } from '@ngrx/store';

export const start = createAction('[Mode] Start');
export const stop = createAction('[Mode] Stop');
export const swap = createAction('[Mode] Swap');