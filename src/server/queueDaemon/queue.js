import QueueItem from './queue.item'

class Queue extends QueueItem {

  // Описание очереди
  constructor(name) {
    super(name)
    this.memberList = {}
    this.callerList = {}
    this.alive = false
  }

  updateMember(member) {
    member.setAlive()
    this.memberList[member.name] = member
  }

  updateCaller(caller) {
    caller.setAlive()
    this.callerList[caller.name] = caller
  }

  setDead() {
    super.setDead()
    for (let member in this.callerList) {
      this.callerList[member].setDead()
    }
    for (let member in this.memberList) {
      this.memberList[member].setDead()
    }
  }
}

export default Queue