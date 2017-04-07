import React, { Component, PropTypes } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import Svg from 'react-native-svg'
import svgs from './svgs'

export default class Icon extends Component {

  static defaultProps = {
      fill: '#000',            
  }

  static propTypes = {
      fill: PropTypes.string.isRequired,      
      name: PropTypes.string.isRequired,                   
      stroke: PropTypes.string,
      strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])   
  }

  renderIcon(){
    const {style, name, onPress, ...props} = this.props    
    // fallback to material?
    const svg = svgs[name]
    if (!svg) 
        return null

    const {width=40, height=40, color='#FFF', stroke, strokeWidth, ...iconStyle} = style || {}    
    const {svg:svgEl, viewBox = '0 0 100 100'} = svg    
    
    return (
      <View style={iconStyle} {...props}>        
        <Svg height={height} width={width} viewBox={viewBox}>
            {React.cloneElement(svgEl, {
                fill: color,
                stroke,
                strokeWidth,
            })}
        </Svg>
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

