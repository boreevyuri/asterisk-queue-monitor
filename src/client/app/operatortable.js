import React from 'react'
import Title from './title'
// import Table from './table'
// import Operator from './operator'
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
      {/*<Table*/}
      {/*  columns={columns.map(el => t(el))}*/}
      {/*  className={'oper'}*/}
      {/*  content={content}*/}
      {/*/>*/}

      <div className={'table'}>
        {/*Table header*/}
        <div className={'header oper'}>
          {columns.map((el) => (
            <div key={el} className={'cell'}>
              <h4>{t(el)}</h4>
            </div>
          ))}
        </div>
        {/*Table content*/}
        {content.map(operator => (
          <div key={operator.name} className={'oper ' + operator.addClass()}>
            {operator.render()}
          </div>
        ))}
      </div>

    </div>
  )
}

export default OperatorTable
