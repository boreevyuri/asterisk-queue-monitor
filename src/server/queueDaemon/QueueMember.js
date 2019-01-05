import QueueItem from './QueueItem'

class QueueMember extends QueueItem {

  constructor(memberData) {
    super(memberData)
    this.name = memberData.Name
    this.membership = memberData.Membership
    this.status = memberData.Status
    this.paused = memberData.Paused
    this.inCall = memberData.InCall
    this.lastCall = memberData.LastCall
  }

}

export default QueueMember