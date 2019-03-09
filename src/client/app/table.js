import React from 'react'
import TableHeader from './table.header'

class Table extends React.Component {

  defaultCounter = 65535

  render() {

    return (
      <div className={'table'}>
        <TableHeader
          columnNames={this.props.columnNames}
          mainStyleClass={this.props.mainStyleClass}
        />

        {this.props.children.map((element, index) => (
          index < (this.props.count || this.defaultCounter) ? (
            <div key={index} className={this.props.mainStyleClass}>
              {element.render()}
            </div>
          ) : null
        ))}
      </div>
    )
  }
}

export default Table