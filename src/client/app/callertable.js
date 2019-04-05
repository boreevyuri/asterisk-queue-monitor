import React, {Component} from 'react'
import Title from './title'
import Table from './table'
import InfoBlock from './infoblock'

const callerColumns = [
  'Pos.',
  'Queue',
  'Caller number',
  'Duration'
]


class CallerTable extends Component {

  sortCallers(queue) {

    return this.props.showAllCallers ? queue
      : queue.filter( caller => +caller.position <= 5 ? caller : null)
  }

  render() {

    const callers = this.props.callers

    return (
      <div>
        <Title
          title={'Queue'}
          subTitle={[
            {
              count: callers.length,
              title: 'callers'
            }
          ]}
          alert={callers.length > this.props.showCallers}
          onClick={this.props.toggleCallers}
        />
        {/*InfoBlock*/}
        {InfoBlock(this.props.queueSizes)}
        {/*Callers table*/}
        <Table
          columnNames={callerColumns}
          mainStyleClass={'caller'}
          children={this.sortCallers(callers)}
        />
      </div>
    )
  }
}

export default CallerTable
