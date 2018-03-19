import {
  SET_TIMER,
  RESET_TIMER,
  SET_STATUS,
  ADD_LAP,
  DELETE_LAP,
  RESET_LAPS
} from './actionTypes'

export const setTimer = timer => ({ type: SET_TIMER, payload: timer })

export const resetTimer = () => ({ type: RESET_TIMER })

export const setStatus = status => ({ type: SET_STATUS, payload: status })

export const addLap = lap => ({ type: ADD_LAP, payload: lap })

export const deleteLap = lapIndex => ({ type: DELETE_LAP, payload: lapIndex })

export const resetLaps = () => ({ type: RESET_LAPS })
