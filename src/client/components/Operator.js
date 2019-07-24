import React from 'react'
import QueueList from './QueueList'

const NewOperator = ({name, lastCall, status, ...props}) => (
    <div className={'oper'}>
      <div className={'cell'}>{name}</div>
      <QueueList {...props}/>
      <div className={'cell'}>{lastCall}</div>
      <div className={'cell'}>{status}</div>
    </div>
)

export default NewOperator
