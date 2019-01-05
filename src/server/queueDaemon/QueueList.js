class QueueList {
  constructor() {
    this.content = {}
  }

  updateQueue(queue) {
    queue.setAlive()
    this.content[queue.queue] = queue
  }

  insertQueueMember(member) {
    this.content[member.queue].updateMember(member)
  }

  insertQueueCaller(caller) {
    this.content[caller.queue].updateCaller(caller)
  }

  // For future use
  // markAllDead() {
  //   for (let queue in this.content) {
  //     this.content[queue].setDead()
  //   }
  // }
  //
  // vaccuum() {
  //   for (let queue in this.content) {
  //     if (!this.content[queue].alive) delete this.content[queue]
  //   }
  // }
}

export default QueueList