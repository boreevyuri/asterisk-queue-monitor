import React, {Component} from 'react'

class Title extends Component {

  render() {

    return (
      <h1 className={`${this.props.alert ? 'alert ' : ''}${this.props.onClick ? 'clickable' : ''}`} onClick={this.props.onClick}>
        <b>{this.props.title}:</b> {this.props.subTitle.map((el, index) => (
          <span key={index}>
            {el.count} {el.title}&nbsp;
          </span>
      ))}
      </h1>
    )
  }
}

export default Title
