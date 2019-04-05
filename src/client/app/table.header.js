import React from 'react'

class TableHeader extends React.Component {

  render() {

    const header = this.props.columnNames.map((i, index) => (
        <div key={index} className={'cell'}>
          <h4>{i}</h4>
        </div>
      )
    )

    return (
      <div className={ this.props.mainStyleClass + ' header'}>
        {header}
      </div>
    )
  }
}

export default TableHeader
