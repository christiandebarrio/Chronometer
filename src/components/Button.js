import React from 'react'

const Display = ({ label, onClick, disabled }) => (
  <button className="button-simple" onClick={onClick} disabled={disabled}>
    {label}
  </button>
)

export default Display
