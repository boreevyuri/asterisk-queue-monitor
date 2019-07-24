import React from 'react'
import * as _ from 'lodash'

const QueueList = ({queue}) => (
  _.sortBy(queue, [q => !q.inCall])
    .map(queueName => (
      <span
        key={queueName.name}
        className={+queueName.inCall ? 'active' : 'passive'}
      >
          {queueName.name}&nbsp;
      </span>
    ))
)

export default QueueList
