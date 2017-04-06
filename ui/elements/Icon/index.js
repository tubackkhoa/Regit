import React, { Component } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import SvgIcon from 'react-native-svg-icon'
import svgs from './svgs'

export default class Icon extends Component {
  render(){
    const {style, name, onPress, ...props} = this.props
    const {width=40, height=40, color='#FFF', ...iconStyle} = style || {}
    return (
      <TouchableWithoutFeedback onPress={onPress} >
        <View style={iconStyle} {...props}>
          <SvgIcon width={width} height={height} name={name} fill={color} svgs={svgs} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
} 

