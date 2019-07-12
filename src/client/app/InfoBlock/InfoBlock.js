import React from 'react'

const InfoBlock = ({queueSizes}) => (
  <div className={'infoblock'}>
    {queueSizes
      .sort((el1, el2) => el2.count - el1.count)
      .map((el) => (
        <div
          key={el.name}
          className={`cell ${el.count > 5 ? ' alert' : ''}`}
        >
          {el.name}: {el.count}
        </div>
      ))}
  </div>
)


export default InfoBlock
