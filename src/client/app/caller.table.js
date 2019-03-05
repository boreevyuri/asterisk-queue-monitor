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
        <div key={index} style={{
          border: '2px solid black',
          background: '#fc3'
        }}>
          <h2>{i}</h2>
        </div>
      )
    )

    return (
      <React.Fragment>
        {header}
      </React.Fragment>
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
        style={{
          border: '1px solid black',
          fontSize: '2rem'
        }}
      >{this.props.caller[el]}</div>
    ))
    return (
      <React.Fragment>
        {line}
      </React.Fragment>
    )
  }
}

class CallerTable extends React.Component {

  render() {

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 5fr 2fr',
        textAlign: 'center'
      }}>
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