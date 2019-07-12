import React from 'react'
// import TableHeader from './table.header'
import {useTranslation} from 'react-i18next'

const Table = ({columnNames: columns, mainStyleClass: className, children}) => {
  const {t} = useTranslation()
  return (
    <div className={'table'}>

      {/*Table header*/}
      <div className={`${className} header`}>
        {
          columns.map((text, index) => (
            <div key={index} className={'cell'}>
              <h4>{t(text)}</h4>
            </div>
          ))
        }
      </div>
      {/*Table content*/}
      {children.map((el, index) => (
        <div key={index} className={className}>
          {el.render()}
        </div>
      ))}
    </div>
  )
}

export default Table
