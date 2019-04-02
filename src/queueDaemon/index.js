const AmiClient = require('asterisk-ami-client')
const Redis = require('redis')
const AMI = require('./config')

import QueueList from './queue.list'
import Queue from './queue'
import QueueMember from './queue.member'
import Caller from './caller'

// Init AMI connect
const amiClient = new AmiClient({
  reconnect: true,
  keepAlive: true,
  emitEventsByTypes: true,
  emitResponsesById: true
})

// Init new list of queues
const queueList = new QueueList()

//Connect to Asterisk
amiClient.connect(AMI.login, AMI.secret, {host: AMI.host, port: AMI.port})
  .then(() => {
    setInterval(
      () => amiClient.action({
        Action: 'QueueStatus',
        ActionID: AMI.actionID
      }),
      2000)
  })
  .catch(error => error)
  .then(error => {
      if (error instanceof Error) throw error
    }
  )

amiClient.on(`QueueParams`, entry => {
  if (entry.ActionID !== AMI.actionID) return
  queueList.updateQueue(new Queue(entry))
})

amiClient.on(`QueueEntry`, entry => {
  if (entry.ActionID !== AMI.actionID) return
  queueList.insertQueueCaller(new Caller(entry))
})

amiClient.on(`QueueMember`, entry => {
  if (entry.ActionID !== AMI.actionID) return
  queueList.insertQueueMember(new QueueMember(entry))
})

amiClient.on(`QueueStatusComplete`, entry => {
  if (entry.ActionID !== AMI.actionID) return

  //Connect to Redis
  const redisClient = Redis.createClient()
  redisClient.on(`error`, err => console.log(`Error ${err}`))
  redisClient.set(`Queue`, JSON.stringify(queueList))
  redisClient.quit()

  // Let's debug it with console.log ;-)
  // console.log(JSON.stringify(queueList.content))

  //For future use :)
  //queueList.markAllDead()
})


// amiClient.on(`resp_${AMI.actionID}`, response => {
//   // console.log(JSON.stringify(queueList.content))
// })
