import React from 'react'
import Chrono from './components/Chrono'

export default class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className="main-content wrapper">
        <Chrono chrono={this.props.chrono} />
      </div>
    )
  }
}
