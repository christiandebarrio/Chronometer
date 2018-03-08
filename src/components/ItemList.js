import React from 'react'
import DeleteButton from './DeleteButton'
import { formatTimer } from '../utils'

const ItemList = ({ timeValue, onDeleteLap, index }) => (
  <li>
    <span>{formatTimer(timeValue)}</span>
    <DeleteButton onClick={() => onDeleteLap(index)} />
  </li>
)

export default ItemList
