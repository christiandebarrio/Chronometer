import React from 'react'
import Button from './Button'
import { TIMER_STATES } from '../constants'

const Display = ({ timer, onStart, onPause, onStop, onLap, timerState }) => {
  const isTimerStarted = timerState === TIMER_STATES.START
  const isTimerStopped = timerState === TIMER_STATES.STOP
  return (
    <div className="timer-display">
      <div className="counter">{timer}</div>
      <div className="counter-actions">
        <Button label="Start" onClick={onStart} disabled={!isTimerStopped} />
        <Button label="Pause" onClick={onPause} disabled={isTimerStopped} />
        <Button label="Stop" onClick={onStop} disabled={isTimerStopped} />
        <Button label="Lap" onClick={onLap} disabled={!isTimerStarted} />
      </div>
    </div>
  )
}

export default Display
