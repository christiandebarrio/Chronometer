import {
  SET_TIMER,
  RESET_TIMER,
  SET_STATUS,
  ADD_LAP,
  DELETE_LAP,
  RESET_LAPS
} from './actionTypes'
import { TIMER_STATES } from '../../constants'

const chrono = (
  state = { status: TIMER_STATES.STOP, timer: 0, laps: [] },
  action
) => {
  switch (action.type) {
    case SET_TIMER:
      return Object.assign({}, state, { timer: action.payload })
    case RESET_TIMER:
      return Object.assign({}, state, { timer: 0 })
    case SET_STATUS:
      return Object.assign({}, state, { status: action.payload })
    case ADD_LAP:
      return Object.assign({}, state, { laps: [...state.laps, action.payload] })
    case DELETE_LAP:
      const newLaps = state.laps.filter(
        (lap, index) => index !== action.payload
      )
      return Object.assign({}, state, { laps: newLaps })
    case RESET_LAPS:
      return Object.assign({}, state, { laps: [] })
    default:
      return state
  }
}

export default chrono
