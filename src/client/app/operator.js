import React from 'react'
import {Trans} from 'react-i18next'

const QueueName = ({active, queueName}) => (
  <span className={+active ? 'active' : 'passive'}>{queueName}&nbsp;</span>
)

class Operator extends React.Component {

  name = this.props.name
  queue = [
    <QueueName
      key={0}
      active={this.props.inCall}
      queueName={this.props.queue}
    />
  ]

  updateData(data) {
    const {queue, inCall} = data
    if (queue) {
      this.queue = +inCall ? [<QueueName key={this.queue.length} active={inCall} queueName={queue}/>, ...this.queue]
        : [...this.queue, <QueueName key={this.queue.length} active={inCall} queueName={queue}/>]
    }
  }

  renderStatus() {
    return +this.props.paused ? <span><Trans>Paused</Trans></span>
      : +this.props.status === 2 ? <span><Trans>Busy</Trans></span>
        : <span><Trans>Free</Trans></span>
  }

  addClass() {
    return +this.props.paused ? `paused`
      : +this.props.status === 2 ? `busy`
        : `free`
  }

  getLastCallTime() {
    return !!(+this.props.lastCall) && new Date(this.props.lastCall * 1000).toLocaleTimeString()
  }

  render() {
    return (
      <>
        <div className={'cell'}>{this.props.name}</div>
        <div className={'cell'}>{this.queue}</div>
        <div className={'cell'}>{this.getLastCallTime()}</div>
        <div className={'cell'}>{this.renderStatus()}</div>
      </>
    )
  }
}

export default Operator
