import React from 'react'
import TableHeader from './table.header'
import {Trans} from 'react-i18next'

class Table extends React.Component {

  render() {

    const columnNames = this.props.columnNames.map(el => (
      <Trans>{el}</Trans>
    ))

    const mainStyleClass = this.props.mainStyleClass

    return (
      <div className={'table'}>
        <TableHeader
          columnNames={columnNames}
          mainStyleClass={mainStyleClass}
        />

        {this.props.children.map((element, index) => (
          <div key={index} className={mainStyleClass}>
            {element.render()}
          </div>
        ))}
      </div>
    )
  }
}

export default Table
