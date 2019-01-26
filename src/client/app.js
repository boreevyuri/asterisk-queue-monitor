import React, {Component} from 'react'
import config from './config'
import Caller from './app/caller'
import Title from './app/title'

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


    for (let element in content) {

      //filling callers list
      for (let caller in content[element].callerList) {
        callers.push(new Caller(content[element].callerList[caller]))
      }

      //filling operators list
      for (let operator in content[element].memberList) {

        //TODO: not obvious, need to refactor
        const foundedOperator = operators.find(item => item.name === content[element].memberList[operator].name)

        if (foundedOperator) {
          foundedOperator.updateData(content[element].memberList[operator])
        } else {
          operators.push(new Operator(content[element].memberList[operator]))
        }
      }
    }

    //Fill state
    this.setState({
      callers: callers,
      operators: operators
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
      <div className={'container-fluid mx-0'}>

        {/*Callers table*/}
        <Title
          title = {'Queue'}
          subTitle = {[
            {
              count: this.state.callers.length,
              title: 'callers'
            }
          ]}
        />
        {/*TODO: Table header*/}
        {/*TODO: Callers table*/}

        {/*Operators table*/}
        <Title
          title = {'Operators'}
          subTitle = {[
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

        {/*TODO: Operators table header*/}
        {/*TODO: Operators table*/}

      </div>
    )
  }
}

export default App