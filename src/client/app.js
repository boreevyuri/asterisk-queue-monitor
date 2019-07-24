import React, {useEffect} from 'react'
import config from './config'
import {connect} from 'react-redux'
import {updateQueue} from './actions/queueActions'
import CallerList from './containers/CallerList'
import OperatorList from './containers/OperatorList'

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

const App = ({updateQueue}) => {

  useEffect(() => {
    updateQueue(config.queueUrl)
    const updateTimer = setInterval(
      () => updateQueue(config.queueUrl), config.updateInterval
    )
    const reloadPageTimer = setTimeout('location.reload()', config.refreshPageInterval)
    return () => {
      clearInterval(updateTimer)
      clearTimeout(reloadPageTimer)
    }
  })

  return (
    <>
      <CallerList/>
      <OperatorList/>
    </>
  )
}


const mapDispatchToProps = dispatch => ({
  updateQueue: url => dispatch(updateQueue(url, dispatch))
})

export default connect(
  () => ({}),
  mapDispatchToProps
)(App)
