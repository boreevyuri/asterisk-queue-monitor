import React from 'react'
import Title from './title'
import Table from './table'
import InfoBlock from './InfoBlock'
import {useTranslation} from 'react-i18next'

const columns = [
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
                     }) => {

  const {t} = useTranslation()

  return (
    <div>
      <Title
        title={t('Queue')}
        subTitle={[
          {
            count: callers.length,
            title: t('callers')
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
        columns={columns.map(el => t(el))}
        className={'caller'}
        content={showAllCallers ? callers :
          callers.filter(caller => +caller.position <= 5 ? caller : null)}
      />
    </div>
  )
}

export default CallerTable
