import { TimesActionTypes, TimesActionsUnion } from './times.actions';

const initialTimes: [number, number] = [25, 5]

export function timesReducer(times: [number, number] = initialTimes, action: TimesActionsUnion) {
  switch (action.type) {
    case TimesActionTypes.SET:
      {
        return action.payload
      }
    case TimesActionTypes.RESET:
      {
        return initialTimes
      }
    default:
      {
        return times;
      }

  }
}