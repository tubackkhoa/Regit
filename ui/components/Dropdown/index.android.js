import React, { Component } from 'react'
import { 
  Icon, 
  Item,
  Input, 
  Picker,
} from 'native-base'

import renderItems from './renderItems'

export default class Dropdown extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      selected: props.selected,
    }
  }

  _handleValueChange = value => {    
    const {onChange} = this.props    
    this.setState({selected: value})    
    onChange && onChange(value)
  }

  render() {

    // by default index should be a key
    const {items, selected, style, inputStyle, inputIconStyle, error} = this.props
    console.log(items,this.state.selected)
    return (
      <Item style={style} error={error}>
        <Input disabled value={items[this.state.selected] || ''} />            
        <Icon name="keyboard-arrow-down" style={inputIconStyle} />
        <Picker style={{position: 'absolute', top: 0, left:0, width:1000, height:1000}}              
            mode="dropdown"           
            selectedValue={selected}
            onValueChange={this._handleValueChange}
        >          
          {renderItems(items)}
        </Picker>
      </Item>
    )
  }
}