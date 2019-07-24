import React from 'react'
import {connect} from 'react-redux'
import {Title} from '../components/title'
import {TableHeader} from '../components/TableHeader'
import {Operator} from '../components/Operator'
import {QueueList} from '../components/QueueList'

const columns = [
  'Operator',
  'Queue',
  'Last Call',
  'Status'
]

const OperatorList = ({operators}) => (
  <div>
    <Title
      title={'Operators'}
      subTitle={[
        {
          count: operators.length,
          title: 'ops'
        },
        {
          count: operators.filter(i => i.status === 'free').length,
          title: 'reachable'
        }
      ]}
    />

    <div className={'table'}>
      <TableHeader
        values={columns}
        extraClass={'oper'}
      />

      {operators.map(operator => (
        <Operator
          key={operator.name}
          name={operator.name}
          queue={
            <QueueList queue={operator.queue}/>
          }
          lastCall={operator.lastCall}
          status={operator.status}
        />
      ))}
    </div>


  </div>
)

const mapStateToProps = (store) => ({
  operators: store.operatorList.operators
})

export default connect(
  mapStateToProps
)(OperatorList)
