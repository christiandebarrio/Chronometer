import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Display from './Display'
import List from './List'
import { formatTimer } from '../utils'
import { TIMER_INTERVAL, TIMER_STATES } from '../constants'

export const chrono = (
  state = { status: TIMER_STATES.STOP, timer: 0, laps: [] },
  action
) => {
  switch (action.type) {
    case 'SET_TIMER':
      return Object.assign({}, state, { timer: action.payload })
    case 'RESET_TIMER':
      return Object.assign({}, state, { timer: 0 })
    case 'SET_STATUS':
      return Object.assign({}, state, { status: action.payload })
    case 'ADD_LAP':
      return Object.assign({}, state, { laps: [...state.laps, action.payload] })
    case 'DELETE_LAP':
      const newLaps = state.laps.filter(
        (lap, index) => index !== action.payload
      )
      return Object.assign({}, state, { laps: newLaps })
    case 'RESET_LAPS':
      return Object.assign({}, state, { laps: [] })
    default:
      return state
  }
}

class Chrono extends React.Component {
  constructor(props) {
    super(props)
    this.handleStart = this.handleStart.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleLap = this.handleLap.bind(this)
    this.handleDeleteLap = this.handleDeleteLap.bind(this)
    this.handleResetLaps = this.handleResetLaps.bind(this)
  }

  setTimer() {
    const newTimer = this.props.timer + TIMER_INTERVAL
    this.props.dispatch({ type: 'SET_TIMER', payload: newTimer })
  }

  resetTimer() {
    this.props.dispatch({ type: 'RESET_TIMER' })
  }

  setStatusStart() {
    this.props.dispatch({ type: 'SET_STATUS', payload: TIMER_STATES.START })
  }

  setStatusPause() {
    this.props.dispatch({ type: 'SET_STATUS', payload: TIMER_STATES.PAUSE })
  }

  setStatusStop() {
    this.props.dispatch({ type: 'SET_STATUS', payload: TIMER_STATES.STOP })
  }

  startInterval() {
    this.intervalId = setInterval(() => this.setTimer(), TIMER_INTERVAL)
  }

  stopInterval() {
    clearInterval(this.intervalId)
  }

  handleStart() {
    this.resetTimer()
    this.setStatusStart()
    this.startInterval()
  }

  handlePause() {
    if (this.props.status === TIMER_STATES.START) {
      this.stopInterval()
      this.setStatusPause()
    } else {
      this.startInterval()
      this.setStatusStart()
    }
  }

  handleStop() {
    this.setStatusStop()
    this.stopInterval()
    this.resetTimer()
  }

  handleLap() {
    const lap = this.props.timer
    this.props.dispatch({ type: 'ADD_LAP', payload: lap })
  }

  handleDeleteLap(lapIndex) {
    this.props.dispatch({ type: 'DELETE_LAP', payload: lapIndex })
  }

  handleResetLaps() {
    this.props.dispatch({ type: 'RESET_LAPS' })
  }

  render() {
    const { timer, status, laps } = this.props
    return (
      <div className="timer">
        <Display
          timer={formatTimer(timer)}
          onStart={this.handleStart}
          onPause={this.handlePause}
          onStop={this.handleStop}
          onLap={this.handleLap}
          timerState={status}
        />
        <List
          laps={laps}
          onDeleteLap={this.handleDeleteLap}
          onResetLaps={this.handleResetLaps}
        />
      </div>
    )
  }
}

Chrono.propTypes = {
  status: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
  laps: PropTypes.arrayOf(PropTypes.number).isRequired
}

const mapStateToProps = state => ({
  status: state.chrono.status,
  timer: state.chrono.timer,
  laps: state.chrono.laps
})

export default connect(mapStateToProps)(Chrono)
