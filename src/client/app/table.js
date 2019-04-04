import React from 'react'
import TableHeader from './table.header'

class Table extends React.Component {

  render() {

    return (
      <div className={'table'}>
        <TableHeader
          columnNames={this.props.columnNames}
          mainStyleClass={this.props.mainStyleClass}
        />

        {this.props.children.map((element, index) => (
          <div key={index} className={this.props.mainStyleClass}>
            {element.render()}
          </div>
        ))}
      </div>
    )
  }
}

export default Table
