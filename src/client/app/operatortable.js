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

    return (
      <div>
        <Title
          title={'Operators'}
          subTitle={[
            {
              count: this.props.operators.length,
              title: 'ops'
            },
            {
              count: this.props.operators.filter(i => +i.status !== 2 && +i.paused !== 1).length,
              title: 'reachable'
            }
          ]}
        />

        <Table
          columnNames={operatorColumns}
          mainStyleClass={'oper'}
          children={this.props.operators}
        />
      </div>
    )
  }
}

export default OperatorTable
