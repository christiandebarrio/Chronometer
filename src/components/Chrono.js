import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Display from './Display'
import List from './List'
import { formatTimer } from '../utils'
import { TIMER_INTERVAL, TIMER_STATES } from '../constants'
import {
  setTimer,
  resetTimer,
  setStatus,
  addLap,
  deleteLap,
  resetLaps
} from '../modules/chrono/actionCreators'
import { getTimer, getStatus, getLaps } from '../modules/chrono/selectors'

class Chrono extends React.Component {
  constructor(props) {
    super(props)
    this.handleStart = this.handleStart.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleLap = this.handleLap.bind(this)
    this.handleDeleteLap = this.handleDeleteLap.bind(this)
  }

  setTimer() {
    const newTimer = this.props.timer + TIMER_INTERVAL
    this.props.setTimer(newTimer)
  }

  startInterval() {
    this.intervalId = setInterval(() => this.setTimer(), TIMER_INTERVAL)
  }

  stopInterval() {
    clearInterval(this.intervalId)
  }

  handleStart() {
    this.props.resetTimer()
    this.props.setStatusStart()
    this.startInterval()
  }

  handlePause() {
    if (this.props.status === TIMER_STATES.START) {
      this.stopInterval()
      this.props.setStatusPause()
    } else {
      this.startInterval()
      this.props.setStatusStart()
    }
  }

  handleStop() {
    this.props.setStatusStop()
    this.stopInterval()
    this.props.resetTimer()
  }

  handleLap() {
    const lap = this.props.timer
    this.props.addLap(lap)
  }

  handleDeleteLap(lapIndex) {
    this.props.deleteLap(lapIndex)
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
          onResetLaps={this.props.resetLaps}
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
  status: getStatus(state),
  timer: getTimer(state),
  laps: getLaps(state)
})

const mapDispatchToProps = {
  setTimer,
  resetTimer,
  setStatusStart: () => setStatus(TIMER_STATES.START),
  setStatusPause: () => setStatus(TIMER_STATES.PAUSE),
  setStatusStop: () => setStatus(TIMER_STATES.STOP),
  addLap,
  deleteLap,
  resetLaps
}

export default connect(mapStateToProps, mapDispatchToProps)(Chrono)
