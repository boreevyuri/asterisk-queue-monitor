import React from 'react'
import Operator from './Operator'

const OperatorList = ({operators}) => (
  <div>
    {operators.map((operator, index) => (
      <Operator key={index} {...operator}/>
    ))}
  </div>
)

export default OperatorList
