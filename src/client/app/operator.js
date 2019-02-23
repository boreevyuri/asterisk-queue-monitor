class Operator {

  constructor(props) {
    // super(props)
    this.name = props.name
    this.membership = props.membership
    this.status = props.status
    this.paused = props.paused
    this.inCall = props.inCall
    this.lastCall = new Date(props.lastCall * 1000)
    this.queue = [props.queue]
  }

  updateData(data) {
    //TODO: refactor it, remove else
    if (data.queue) {
      if (+data.inCall) {
        this.queue.splice(0, 0, data.queue)
      } else {
        this.queue.push(data.queue)
      }
    }
  }

  isPaused() {
    return +this.paused
  }

  isBusy() {
    return +this.status === 2
  }

}

export default Operator