import React from 'react'

const TableHeader = ({mainStyleClass, columnNames}) => (
  <div className={`${mainStyleClass} header`}>
    {columnNames.map((text, index) => (
      <div key={index} className={'cell'}>
        <h4>{text}</h4>
      </div>
    ))}
  </div>
)

export default TableHeader
