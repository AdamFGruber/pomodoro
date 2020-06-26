import { Action } from '@ngrx/store';

export const START = 'START'
export const STOP = 'STOP'
export const SWAP = 'SWAP'

const initialState: number = 0

export function modeReducer(state: number = initialState, action: Action) {
  switch (action.type) {
    case START:
      {
        return (state == 0) ? 1 : state
      }
    case STOP:
      { return 0 }
    case SWAP:
      {
        if (state == 1) {
          return 2
        }
        else if (state == 2) {
          return 1
        }
        else return state
      }
    default:
      return state;
  }
}