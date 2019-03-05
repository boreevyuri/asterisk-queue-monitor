import React from 'react'

class TableHeader extends React.Component {

  cellText = [
    'Operator',
    'Queue',
    'Last Call Time',
    'Status'
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

class OperatorLine extends React.Component {

  order = [
    'name',
    'queue',
    'lastCall',
    'status'
  ]

  render() {

    const line = this.order.map((el, index) => (
      <div
        key={index}
        style={{
          border: '1px solid black',
          fontSize: '2rem'
        }}
      >
        {this.props.operator[el]}
      </div>
    ))
    return (
      <React.Fragment>
        {line}
      </React.Fragment>
    )
  }
}

class OperatorsTable extends React.Component {

  render() {

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 6fr 2fr 2fr',
        textAlign: 'center'
      }}>
        <TableHeader/>

        {this.props.children.map((operator, index) => (
          <OperatorLine
            key={index}
            operator={operator}
          />
        ))}
      </div>
    )
  }
}

export default OperatorsTable