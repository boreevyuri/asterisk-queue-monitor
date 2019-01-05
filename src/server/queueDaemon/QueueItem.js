class QueueItem {

  constructor(data) {
    this.queue = data.Queue
    this.alive = false
  }

  setAlive() {
    this.alive = true
  }

  setDead() {
    this.alive = false
  }
}

export default QueueItem