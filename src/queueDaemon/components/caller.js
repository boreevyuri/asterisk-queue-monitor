class Channel {
  constructor(channel) {
    this.channel = channel.Channel
    this.channelState = channel.ChannelState
    this.callerIdNum = channel.CallerIDNum
    this.callerIdName = channel.CallerIDName
    this.connectedLineNum = channel.ConnectedLineNum
    this.connectedLineName = channel.ConnectedLineName
    this.uniqueId = channel.Uniqueid
    this.linkedId = channel.Linkedid
    this.application = channel.Application
    this.duration = channel.Seconds
  }
}

export default Channel
