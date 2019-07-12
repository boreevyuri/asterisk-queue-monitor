import React from 'react'

const Title = ({
                 title = null,
                 subTitle = null,
                 onClick = null,
                 alert = false
               }) => {

  const renderSubTitle = subTitle.map((el, index) => (
    <span key={`subt_${index}`}>
      {el.count} {el.title}&nbsp;
    </span>
  ))

  return (
    <h1 className={(alert ? 'alert ' : '') + (onClick ? 'clickable' : '')}
        onClick={onClick}
    >
      <b>{title}: {renderSubTitle}</b>
    </h1>
  )
}

export default Title
