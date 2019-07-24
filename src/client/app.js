import React, {Component} from 'react'
import _ from 'lodash'
import config from './config'
import Operator from './app/operator'
import CallerTable from './app/callertable'
import OperatorTable from './app/operatortable'
import {connect} from 'react-redux'
import {toggleCallers} from './actions/callerActions'
import {updateQueue} from './actions/queueActions'


// import NewOperator from './components/Operator'

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
    // showAllCallers: false,
    sortQueuesByActive: config.sortQueuesByActive || true,
    // callers: [],
    operators: [],
    queueSizes: [],
    newOperators: []
  }

  updateQueue = async () => {
    // let callers = []
    let operators = []
    let queueSizes = []

    const {content} = await fetch(config.queueUrl)
      .then(res => res.json())


    _.forIn(content, (queue) => {

      // get callerList
      if (!_.isEmpty(queue['callerList'])) {
        // _.forIn(queue['callerList'], (caller) => {
        //   callers.push(caller)
        // })
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
          if (founded === undefined) {
            operators.push(new Operator(member))
          } else {
            founded.updateData(member)
          }
        })
      }
    })

    //Fill state
    this.setState({
      // callers,
      operators,
      queueSizes
    })

  }

  componentDidMount() {
    // this.props.getCallers(config.queueUrl)
    this.props.updateQueue(config.queueUrl)
    setInterval(() => {
        this.props.updateQueue(config.queueUrl)
      },
      config.updateInterval
    )
    // this.updateQueue()
    // setInterval(() => {
    //   this.updateQueue()
    // }, config.updateInterval)
    // setTimeout('location.reload()', config.refreshPageInterval)
  }

  render() {
    return (
      <>
        <CallerTable
          callers={this.props.callers.callers}
          showAllCallers={this.props.callers.showAllCallers}
          toggleCallers={this.props.toggleCallers}
          queueSizes={this.state.queueSizes}
          // queueSizes={this.props.callers.callers}
        />

        <OperatorTable
          content={this.state.operators}
        />

        {/*<NewOperator*/}
        {/*  name={'770111'}*/}
        {/*  lastCall={'yesterday'}*/}
        {/*  status={'paused'}*/}
        {/*  queue={[*/}
        {/*    {name: 'main', inCall: false},*/}
        {/*    {name: 'second main', inCall: true},*/}
        {/*    {name: 'not main', inCall: false}*/}
        {/*  ]}*/}
        {/*/>*/}
        {/*<VisibleOperatorList/>*/}
      </>
    )
  }
}

const mapStateToProps = store => ({
  callers: store.callers,
  operators: store.operators
})

const mapDispatchToProps = dispatch => ({
  toggleCallers: () => dispatch(toggleCallers()),
  updateQueue: url => dispatch(updateQueue(url, dispatch))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
