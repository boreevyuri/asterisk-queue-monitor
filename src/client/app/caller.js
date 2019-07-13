import React from 'react'

const Caller = ({props}) => {
  const {position, queue, name, duration, maxDuration = 400} = props
  return (
    <div className={`caller ${+duration > maxDuration ? ' longwait' : ''}`}>
      <div className={'cell'}>{position}</div>
      <div className={'cell'}>{queue}</div>
      <div className={'cell'}>{name}</div>
      <div className={'cell'}>{duration}</div>
    </div>
  )
}

export default Caller
