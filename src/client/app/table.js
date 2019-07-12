import React from 'react'

const Table = ({columns, className, content}) => {
  return (
    <div className={'table'}>

      {/*Table header*/}
      <div className={`${className} header`}>
        {
          columns.map((text, index) => (
            <div key={index} className={'cell'}>
              <h4>{text}</h4>
            </div>
          ))
        }
      </div>

      {/*Table content*/}
      {content.map((el, index) => (
        <div key={index} className={className}>
          {el.render()}
        </div>
      ))}
    </div>
  )
}

export default Table
