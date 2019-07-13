import React from 'react'
import Title from './title'
import Caller from './caller'
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

      <div className={'table'}>
        {/*Table header*/}
        <div className={'header caller'}>
          {columns.map((el) => (
            <div key={el} className={'cell'}>
              <h4>{t(el)}</h4>
            </div>
          ))}
        </div>

        {callers.map(el => (
          (showAllCallers || el.position <=5) ? <Caller key={el.name} props={el}/> : null
        ))}

      </div>
    </div>
  )
}

export default CallerTable
