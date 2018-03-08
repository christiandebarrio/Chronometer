import React from 'react'
import Chrono from './components/Chrono'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = { status: 'stopped', timer: 0 }
  }
  render() {
    const { timer, status } = this.state
    return (
      <div className="main-content wrapper">
        <Chrono />
      </div>
    )
  }
}
