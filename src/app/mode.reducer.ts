import { createReducer, on } from '@ngrx/store';
import { start, stop, swap } from './mode.actions';

export const initialState = 0;

const _modeReducer = createReducer(initialState,
  on(start, state => { if (state == 0) { 1 } else { state } }),
  on(stop, state => 0),
  on(swap, state => { if (state == 1) { 2 } else if (state == 2) { 1 } else { 0 } }),
);

export function modeReducer(state, action) {
  return _modeReducer(state, action);
}