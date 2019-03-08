import React from 'react'

class TableHeader extends React.Component {

  cellText = [
    'Operator',
    'Queue',
    'Last Call',
    'Status'
  ]

  render() {

    const header = this.cellText.map((i, index) => (
        <div key={index} className={'cell'}>
          <h4>{i}</h4>
        </div>
      )
    )

    return (
      <div className={'oper header'}>
        {header}
      </div>
    )
  }
}

class OperatorsTable extends React.Component {

  render() {

    return (
      <div className={'table'}>
        <TableHeader/>

        {this.props.children.map((operator, index) => (
          <div key={index} className={'oper'}>
            {operator.render()}
          </div>
        ))}
      </div>
    )
  }
}

export default OperatorsTable