import React from 'react'
import {useTranslation} from 'react-i18next'

export const TableHeader = ({values, extraClass}) => {
  const {t} = useTranslation()
  return (
    <div className={`header ${extraClass}`}>
      {values.map((el) => (
        <div key={el} className={'cell'}>
          <h4>{t(el)}</h4>
        </div>
      ))}
    </div>
  )
}

