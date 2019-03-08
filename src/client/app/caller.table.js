import React from 'react'

class TableHeader extends React.Component {

  cellText = [
    'Pos.',
    'Queue',
    'Caller number',
    'Duration'
  ]

  render() {

    const header = this.cellText.map((i, index) => (
        <div
          key={index}
          className={'cell'}
        >
          <h4>{i}</h4>
        </div>
      )
    )

    return (
      <div className={'caller header'}>
        {header}
      </div>
    )
  }
}

class CallerLine extends React.Component {


  // caller = this.props.caller

  order = [
    'position',
    'queue',
    'name',
    'duration'
  ]

  render() {

    const line = this.order.map((el, index) => (
      <div
        key={index}
        className={'cell'}
      >{this.props.caller[el]}</div>
    ))
    return (
      <div className={'caller'}>
        {line}
      </div>
    )
  }
}

class CallerTable extends React.Component {

  render() {

    return (
      <div className={'table'}>
        <TableHeader/>

        {this.props.children.map((caller, index) => (
          <CallerLine
            key={index}
            caller={caller}
          />
        ))}
      </div>
    )
  }
}

export default CallerTable