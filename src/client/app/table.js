import React from 'react'
import TableHeader from './table.header'
import {useTranslation} from 'react-i18next'

const Table = ({columnNames: columns, mainStyleClass: className, children}) => {
  const {t} = useTranslation()
  return (
    <div className={'table'}>
      <TableHeader
        columns={columns.map(el => t(el))}
        className={className}
      />

      {children.map((el, index) => (
        <div key={index} className={className}>
          {el.render()}
        </div>
      ))}
    </div>
  )
}

export default Table
