import React from 'react'
import Title from './title'
import Table from './table'

const columnNames = [
  'Operator',
  'Queue',
  'Last Call',
  'Status'
]

const OperatorTable = ({operators}) => (
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
      columnNames={columnNames}
      mainStyleClass={'oper'}
    >
      {operators}
    </Table>
  </div>
)

export default OperatorTable
