import React, { Component } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import SvgIcon from 'react-native-svg-icon'
import svgs from './svgs'

export default class Icon extends Component {

  renderIcon(){
    const {style, name, onPress, ...props} = this.props
    const {width=40, height=40, color='#FFF', ...iconStyle} = style || {}
    return (
      <View style={iconStyle} {...props}>
        <SvgIcon width={width} height={height} name={name} fill={color} svgs={svgs} />
      </View>
    )
  }

  render(){
    const {onPress} = this.props   
    // if do not have onPress, should make clickable from parent 
    return (onPress
      ? <TouchableWithoutFeedback onPress={onPress} >
          {this.renderIcon()}
        </TouchableWithoutFeedback>
      : this.renderIcon()
    )
  }
} 

