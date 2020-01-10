import React from 'react'
import {useTranslation} from 'react-i18next'
import capitalize from 'lodash/capitalize'
import config from '../config'

export const Operator = ({name, lastCall, queue, status, duration}) => {
  const {t} = useTranslation()
  const extraClass = (duration > (config.alertOperator || 300)) && (status === `busy`) ? 'yellow ' : ''
  return (
    <div className={`oper ${status}`}>
      <div className={'cell'}>{name}</div>
      <div className={'cell'}>{queue}</div>
      <div className={`${extraClass} cell`}>{duration}</div>
      <div className={'cell'}>{lastCall}</div>
      <div className={'cell'}>{t(capitalize(status))}</div>
    </div>
  )
}

