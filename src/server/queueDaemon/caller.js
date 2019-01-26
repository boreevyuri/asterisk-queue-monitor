import QueueItem from './queue.item'

class Caller extends QueueItem {
  constructor(callerData) {
    super(callerData)
    this.name = callerData.CallerIDName
    this.position = callerData.Position
    this.duration = callerData.Wait
  }
}

export default Caller
