import React, {Component} from 'react'

class Title extends Component {

  render() {
    return (
      <h1>
        <b>{this.props.title}:</b> {this.props.subTitle.map((el, index) => (
          <span key={index}>
            {el.count} {el.title}
          </span>
      ))}
      </h1>
    )
  }
}

export default Title