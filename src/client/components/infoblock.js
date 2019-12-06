import React from 'react'
// import {countBy, forIn} from 'lodash'
import countBy from 'lodash/countBy'
import forIn from 'lodash/forIn'

const InfoBlock = ({callers}) => {

  const data = []
  forIn(
    countBy(callers, el => el.queue),
    (value, key) => data.push({
      name: key,
      size: value
    })
  )

  return (
    <div className={'infoblock'}>
      {
        data
          .sort((a, b) => b.name - a.name)
          .sort((a,b) => b.size - a.size)
          .map(el => (
            <div
              key={el.name}
              className={`cell ${el.size > 5 ? ' alert' : ''}`}
            >
              {el.name}: {el.size}
            </div>
          ))
      }
    </div>
  )
}


export default InfoBlock
