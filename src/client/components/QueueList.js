import React from 'react'
import * as _ from 'lodash'

export const QueueList = ({queue}) => (
  _.sortBy(queue, [q => !q.active])
    .map(queueName => (
      <span
        key={queueName.name}
        className={queueName.active ? 'active' : 'passive'}
      >
          {queueName.queue}&nbsp;
      </span>
    ))
)

// export default QueueList
