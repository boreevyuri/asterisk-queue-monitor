import React, {Component} from 'react'
import Title from './title'
import Table from './table'

const operatorColumns = [
  'Operator',
  'Queue',
  'Last Call',
  'Status'
]

class OperatorTable extends Component {


  render() {

    const operators = this.props.operators

    return (
      <div>
        <Title
          title={'Operators'}
          subTitle={[
            {
              count: operators.length,
              title: 'ops'
            },
            {
              count: operators.filter(i => +i.status !== 2 && +i.paused !== 1).length,
              title: 'reachable'
            }
          ]}
        />

        <Table
          columnNames={operatorColumns}
          mainStyleClass={'oper'}
          children={operators}
        />
      </div>
    )
  }
}

export default OperatorTable
