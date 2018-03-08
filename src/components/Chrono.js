import React from 'react'
import Display from './Display'
import List from './List'
import { formatTimer } from '../utils'
import { TIMER_INTERVAL, TIMER_STATES } from '../constants'

export default class Chrono extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      timer: 0,
      status: TIMER_STATES.STOP,
      laps: []
    }
    this.setTimer = this.setTimer.bind(this)
    this.setStatusStart = this.setStatusStart.bind(this)
    this.setStatusPause = this.setStatusPause.bind(this)
    this.setStatusStop = this.setStatusStop.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.startInterval = this.startInterval.bind(this)
    this.stopInterval = this.stopInterval.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleLap = this.handleLap.bind(this)
    this.handleDeleteLap = this.handleDeleteLap.bind(this)
    this.handleResetLaps = this.handleResetLaps.bind(this)
  }

  setTimer() {
    const timer = this.state.timer + TIMER_INTERVAL
    this.setState({ timer })
  }

  setStatusStart() {
    this.setState({ status: TIMER_STATES.START })
  }

  setStatusPause() {
    this.setState({ status: TIMER_STATES.PAUSE })
  }

  setStatusStop() {
    this.setState({ status: TIMER_STATES.STOP })
  }

  resetTimer() {
    this.setState({ timer: 0 })
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
    if (this.state.status === TIMER_STATES.START) {
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
    this.setState({ laps: this.state.laps.concat(this.state.timer) })
  }

  handleDeleteLap(lapIndex) {
    this.setState({
      laps: this.state.laps.filter((lap, index) => index !== lapIndex)
    })
  }

  handleResetLaps() {
    this.setState({
      laps: []
    })
  }

  render() {
    const { timer, status, laps } = this.state
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
