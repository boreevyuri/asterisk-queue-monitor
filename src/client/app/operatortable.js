import React from 'react'
import Title from './title'
import Table from './table'
import {useTranslation} from 'react-i18next'

const columns = [
  'Operator',
  'Queue',
  'Last Call',
  'Status'
]

const OperatorTable = ({content}) => {
  const {t} = useTranslation()
  return (
    <div>
      <Title
        title={t('Operators')}
        subTitle={[
          {
            count: content.length,
            title: t('ops')
          },
          {
            count: content.filter(i => +i.status !== 2 && +i.paused !== 1).length,
            title: t('reachable')
          }
        ]}
      />
      <Table
        columns={columns.map(el => t(el))}
        className={'oper'}
        content={content}
      />
    </div>
  )
}

export default OperatorTable
