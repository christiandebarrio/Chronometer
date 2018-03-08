import React from 'react'

const ResetButton = ({ onResetLaps, disabled }) => (
  <button className="button-error" onClick={onResetLaps} disabled={disabled}>
    <span className="icon icon-refresh-ccw" />
    <span className="text">Reset</span>
  </button>
)

export default ResetButton
