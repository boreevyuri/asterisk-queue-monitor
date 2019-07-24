import React from 'react'
import {useTranslation} from 'react-i18next'

export const Title = ({
                 title = null,
                 subTitle = null,
                 onClick = null,
                 alert = false
               }) => {

  const {t} = useTranslation()
  const renderSubTitle = subTitle.map((el, index) => (
    <span key={`subt_${index}`}>
      {el.count} {t(el.title)}&nbsp;
    </span>
  ))

  return (
    <h1 className={(alert ? 'alert ' : '') + (onClick ? 'clickable' : '')}
        onClick={onClick}
    >
      <b>{t(title)}: {renderSubTitle}</b>
    </h1>
  )
}

