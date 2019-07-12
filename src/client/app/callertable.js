import React from 'react'
import Title from './title'
import Table from './table'
import InfoBlock from './InfoBlock'

const columnNames = [
  'Pos.',
  'Queue',
  'Caller number',
  'Duration'
]

const CallerTable = ({
                       callers = [],
                       showAllCallers = true,
                       toggleCallers = null,
                       queueSizes = []
                     }) => (
  <div>
    <Title
      title={'Queue'}
      subTitle={[
        {
          count: callers.length,
          title: 'callers'
        }
      ]}
      //TODO: put alert queue length into config
      alert={callers.length > 50}
      onClick={toggleCallers}
    />
    {/*InfoBlock*/}
    <InfoBlock queueSizes={queueSizes}/>
    {/*Callers table*/}
    <Table
      columnNames={columnNames}
      mainStyleClass={'caller'}
    >
      {showAllCallers ? callers :
        callers.filter(caller => +caller.position <= 5 ? caller : null)
      }
    </Table>
  </div>
)

export default CallerTable
