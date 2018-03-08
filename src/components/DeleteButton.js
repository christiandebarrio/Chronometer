import React from 'react'

const DeleteButton = ({ onClick }) => (
  <button className="button-icon" onClick={onClick}>
    <span className="icon icon-x-circle" />
  </button>
)

export default DeleteButton
