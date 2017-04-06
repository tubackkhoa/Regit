import React, { Component } from 'react'
import { 
  Icon, 
  Item,
  Input, 
  Picker,
} from 'native-base'

import renderItems from './renderItems'

export default class Dropdown extends Component {

  _renderButton = (onPress, text, picker, selected)=> {
    const {style, inputStyle, inputIconStyle, error} = this.props
    return (
      <Item style={style} onPress={onPress} error={error} >
        <Input disabled value={text} style={inputStyle} />            
        <Icon name="keyboard-arrow-down" style={inputIconStyle} />
      </Item>            
    )
  }

  _handleValueChange = value => {
    const {onChange} = this.props
    onChange && onChange(value)
  }

  render() {
    const {items, header, selected} = this.props
    return (
      <Picker renderButton={this._renderButton}                 
          iosHeader={header}                        
          selectedValue={selected}
          onValueChange={this._handleValueChange}
      >
        {renderItems(items)}
      </Picker>
    )
  }
}

