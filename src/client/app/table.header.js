import React from 'react'

const TableHeader = ({className, columns}) => (
  <div className={`${className} header`}>
    {columns.map((text, index) => (
      <div key={index} className={'cell'}>
        <h4>{text}</h4>
      </div>
    ))}
  </div>
)

export default TableHeader
