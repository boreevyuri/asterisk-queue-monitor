import React, {Component} from 'react'

class Title extends Component {

  render() {

    return (
      <h1>
        <b>{this.props.title}:</b> {this.props.subTitle.map((el, index) => (
          <span key={index} className={this.props.alert ? 'alert' : null} onClick={this.props.onClick}>
            {el.count} {el.title}&nbsp;
          </span>
      ))}
      </h1>
    )
  }
}

export default Title