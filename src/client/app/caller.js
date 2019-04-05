import React from 'react'

class Caller extends React.Component {

  name = this.props.name
  queue = this.props.queue
  position = this.props.position
  duration = this.props.duration
  order = this.props.order || [
    'position',
    'queue',
    'name',
    'duration'
  ]
  maxDuration = 600

  addClass() {
    return +this.duration > this.maxDuration ? `longwait ` : null
  }

  render() {
    return (
      <React.Fragment>
        {this.order.map((el, index) => (
          <div key={index} className={`${this.addClass()} cell`}>
            {this[el]}
          </div>
        ))}
      </React.Fragment>
    )
  }

}

export default Caller
