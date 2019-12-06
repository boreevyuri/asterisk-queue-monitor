import React from 'react'
import sortBy from 'lodash-es/sortBy'

export const QueueList = ({queue}) => (
  sortBy(queue, [q => !q.active])
    .map(queueName => (
      <span
        key={queueName.queue}
        className={queueName.active ? 'active' : 'passive'}
      >
          {queueName.queue}&nbsp;
      </span>
    ))
)

// export default QueueList
