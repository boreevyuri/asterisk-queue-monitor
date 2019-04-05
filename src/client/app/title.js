import React, {Component} from 'react'
import {Trans} from 'react-i18next'

class Title extends Component {

  render() {

    const title = <Trans>{this.props.title}</Trans>
    const subTitle = this.props.subTitle.map((el, index) => (
      <span key={index}>
            {el.count} <Trans>{el.title}</Trans>&nbsp;
          </span>
    ))
    const className = `${this.props.alert ? 'alert ' : ''}${this.props.onClick ? 'clickable' : ''}`

    return (
      <h1 className={className}
          onClick={this.props.onClick}>
        <b>{title}:</b> {subTitle}
      </h1>
    )
  }
}

export default Title
