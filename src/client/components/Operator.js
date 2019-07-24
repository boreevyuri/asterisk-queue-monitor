import React from 'react'
import {useTranslation} from 'react-i18next'
import * as _ from 'lodash'

export const Operator = ({name, lastCall, queue, status}) => {
      const {t} = useTranslation()
  return (
    <div className={`oper ${status}`}>
      <div className={'cell'}>{name}</div>
      <div className={'cell'}>{queue}</div>
      <div className={'cell'}>{lastCall}</div>
      <div className={'cell'}>{t(_.capitalize(status))}</div>
    </div>
  )
}

