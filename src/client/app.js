import React, {Component} from 'react'
import _ from 'lodash'
import config from './config'
import Caller from './app/caller'
import Operator from './app/operator'
import CallerTable from './app/callertable'
import OperatorTable from './app/operatortable'

/**
 const exampleQueue = {
  exampleQueue: {
    queue: 'example',
    alive: true,
    memberList: {
      7723: {
        queue: 'example',
        alive: true,
        name: '7723',
        membership: 'static',
        status: '1',
        paused: '1',
        inCall: '0',
        lastCall: '0'
      },
      0146: {
        queue: 'example',
        alive: true,
        name: '0146',
        membership: 'static',
        status: '2',
        paused: '0',
        inCall: '0',
        lastCall: '1548507880'
      }
    },
    callerList: {
      25902071: {
        queue: 'example',
        alive: true,
        name: '25902071',
        position: '2',
        duration: '106'
      },
      23182141: {
        queue: 'example',
        alive: true,
        name: '23182141',
        position: '1',
        duration: '151'
      }
    }
  }
}
 */

class App extends Component {

  state = {
    showAllCallers: false,
    sortQueuesByActive: config.sortQueuesByActive || true,
    callers: [],
    operators: [],
    queueSizes: []
  }

  updateQueue = async () => {
    let callers = []
    let operators = []
    let queueSizes = []

    const {content} = await fetch(config.queueUrl)
      .then(res => res.json())


    _.forIn(content, (queue) => {

      //get callerList
      if (!_.isEmpty(queue['callerList'])) {
        _.forIn(queue['callerList'], (caller) => {
          callers.push(new Caller(caller))
        })
        queueSizes.push({
          name: queue['queue'],
          count: _.size(queue['callerList'])
        })
      }

      //get memberList
      if (!_.isEmpty(queue['memberList'])) {
        _.forIn(queue['memberList'], (member) => {
          let founded = _.find(operators, {'name': member['name']})
          // console.log(founded)
          switch (founded) {
            case undefined:
              operators.push(new Operator(member))
              break
            default:
              founded.updateData(member)
          }
        })
      }
    })

    //Fill state
    this.setState({
      callers,
      operators,
      queueSizes
    })

  }

  componentDidMount() {
    this.updateQueue()
    setInterval(() => {
      this.updateQueue()
    }, config.updateInterval)
    setTimeout('location.reload()', config.refreshPageInterval)
  }

  render() {

    return (
      <>
        <CallerTable
          callers={this.state.callers}
          showAllCallers={this.state.showAllCallers}
          toggleCallers={() => this.setState({showAllCallers: !this.state.showAllCallers})}
          queueSizes={this.state.queueSizes}
        />

        <OperatorTable
          content={this.state.operators}
        />
      </>
    )
  }
}

export default App
