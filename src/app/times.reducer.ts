import { Action } from '@ngrx/store';

export const INPUT = 'INPUT'

const initialTimes: [number, number] = [25, 10]

export function timeReducer(times: [number, number] = initialTimes, action: Action) {
  switch (action.type) {
    case INPUT:
      {
        return times
      }
    default:
      return times;
  }
}