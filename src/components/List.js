import React from 'react'
import ItemList from './ItemList'
import ResetButton from './ResetButton'

const List = ({ laps, onDeleteLap, onResetLaps }) => {
  const renderLaps = () =>
    laps.map((lap, index) => (
      <ItemList
        timeValue={lap}
        onDeleteLap={onDeleteLap}
        key={`lap-${index}`}
        index={index}
      />
    ))
  return (
    <div className="timer-content">
      <div className="timer-list">
        <ul>{renderLaps()}</ul>
      </div>
      <div className="timer-actions">
        <ResetButton
          onResetLaps={onResetLaps}
          disabled={laps && !laps.length}
        />
      </div>
    </div>
  )
}

export default List
