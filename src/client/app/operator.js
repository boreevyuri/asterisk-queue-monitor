import React from 'react'

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
    'status'
  ]
  // membership = this.props.membership
  status = this.renderStatus()
  inCall = this.props.inCall
  lastCall = this.props.lastCall !== '0' ?
    new Date(this.props.lastCall * 1000).toLocaleTimeString() : ''
  queue = [<QueueName key={0} active={this.props.inCall}>{this.props.queue} </QueueName>]

  updateData(data) {
    if (data.queue) {
      if (+data.inCall) {
        this.queue.splice(0, 0, <QueueName key={this.queue.length} active={data.inCall}>{data.queue} </QueueName>)
        return
      }
      this.queue.push(<QueueName key={this.queue.length} active={data.inCall}>{data.queue} </QueueName>)
    }
  }

  renderStatus() {
    if (+this.props.paused) {
      return <span>Paused</span>
    }
    if (+this.props.status === 2) {
      return <span>Busy</span>
    }
    return <span>Free</span>
  }


  render() {

    return (
      <React.Fragment>
        {this.order.map((el, index) => (
          <div key={index} className={'cell'}>
            {this[el]}
          </div>
        ))}
      </React.Fragment>
    )

  }
}

export default Operator