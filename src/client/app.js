import React, {Component} from 'react'
import _ from 'lodash'
import config from './config'
import Caller from './app/caller'
import Operator from './app/operator'
import Title from './app/title'
import Table from './app/table'

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
    callers: [],
    operators: []
  }

  updateQueue = async () => {
    let callers = []
    let operators = []

    const {content} = await fetch(config.queueUrl)
      .then(res => res.json())


    _.forIn(content, (queue) => {

      //get callerList
      if (!_.isEmpty(queue['callerList'])) {
        _.forIn(queue['callerList'], (caller) => {
          callers.push(new Caller(caller))
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
      operators
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

    const callerColumns = [
      'Pos.',
      'Queue',
      'Caller number',
      'Duration'
    ]

    const operatorColumns = [
      'Operator',
      'Queue',
      'Last Call',
      'Status'
    ]

    return (
      <React.Fragment>

        {/*Callers table*/}
        <Title
          title={'Queue'}
          subTitle={[
            {
              count: this.state.callers.length,
              title: 'callers'
            }
          ]}
        />

        <Table
          columnNames={callerColumns}
          mainStyleClass={'caller'}
          children={this.state.callers}
        />

        {/*Operators table*/}
        <Title
          title={'Operators'}
          subTitle={[
            {
              count: this.state.operators.length,
              title: 'ops'
            },
            {
              count: this.state.operators.filter(i => +i.status !== 2 && +i.paused !== 1).length,
              title: 'reachable'
            }
          ]}
        />

        <Table
          columnNames={operatorColumns}
          mainStyleClass={'oper'}
          children={this.state.operators}
        />

      </React.Fragment>
    )
  }
}

export default App