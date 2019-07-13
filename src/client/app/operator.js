import React from 'react'
import {Trans} from 'react-i18next'

const QueueName = ({active, queueName}) => (
  <span className={+active ? 'active' : 'passive'}>{queueName}&nbsp;</span>
)

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
  queue = [<QueueName key={0} active={this.props.inCall} queueName={this.props.queue}/>]

  updateData(data) {
    if (data.queue) {
      if (+data.inCall) {
        this.queue.splice(0, 0, <QueueName key={this.queue.length} active={data.inCall} queueName={data.queue}/>)
        return
      }
      this.queue.push(<QueueName key={this.queue.length} active={data.inCall} queueName={data.queue}/>)
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
