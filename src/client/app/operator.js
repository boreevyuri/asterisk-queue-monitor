import React from 'react'
import {Trans} from 'react-i18next'

class QueueName extends React.Component {

  render() {
    return (
      <span
        className={
          +this.props.active
            ? 'active'
            : 'passive'
        }
        children={this.props.children}
      />
    )
  }
}

class Operator extends React.Component {

  name = this.props.name
  order = this.props.order || [
    'name',
    'queue',
    'lastCall',
    'statusRendered'
  ]
  status = this.props.status
  statusRendered = this.renderStatus()
  paused = this.props.paused
  inCall = this.props.inCall
  lastCall = this.props.lastCall !== '0' ?
    new Date(this.props.lastCall * 1000).toLocaleTimeString() : ''
  queue = [<QueueName key={0} active={this.props.inCall}>{this.props.queue} </QueueName>]

  updateData(data) {
    if (data.queue) {
      if (+data.inCall && this.props.sortQueuesByActive) {
        this.queue.splice(0, 0, <QueueName key={this.queue.length} active={data.inCall}>{data.queue} </QueueName>)
        return
      }
      this.queue.push(<QueueName key={this.queue.length} active={data.inCall}>{data.queue} </QueueName>)
    }
  }

  renderStatus() {
    return +this.props.paused ? <span><Trans>Paused</Trans></span>
      : +this.props.status === 2 ? <span><Trans>Busy</Trans></span>
        : <span><Trans>Free</Trans></span>
  }

  addClass() {
    return +this.paused ? `paused`
      : +this.status === 2 ? `busy`
        : `free`
  }

  render() {

    return (
      <>
        {this.order.map((el, index) => (
          <div key={index} className={`${this.addClass()} cell`}>
            {this[el]}
          </div>
        ))}
      </>
    )

  }
}

export default Operator
