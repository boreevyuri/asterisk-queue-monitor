import React from 'react'

const InfoBlock = (array) => {

  return (
    <div className={'infoblock'}>
      {array
        .sort((el1, el2) => el2.count - el1.count)
        .map( (el,index) => (
        <div
          className={`cell ${el.count > 5? ' alert' : ''}`}
          key={index}
        >
          {el.name}: {el.count}
        </div>
      ))}
    </div>
  )
}

export default InfoBlock
