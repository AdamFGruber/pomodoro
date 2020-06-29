import { ModeActionTypes, ModeActionsUnion } from './mode.actions';

const initialState: number = 0

export function modeReducer(state: number = initialState, action: ModeActionsUnion) {
  switch (action.type) {
    case ModeActionTypes.START:
      {
        return (state == 0) ? 1 : state
      }
    case ModeActionTypes.STOP:
      {
        return 0
      }
    case ModeActionTypes.SWAP:
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
      {
        return state;
      }
  }
}