import React, { PureComponent } from 'react'

import { 
  Text,
  Button,   
  View,  
} from 'native-base'

import Icon from '~/ui/elements/Icon'

import styles from './styles'

export default class extends PureComponent {

  constructor(props) {
    super(props)  
    this.state = {
      checked: !!props.checked,
    }
  }

  // can receive prop and can update via state
  componentWillReceiveProps({checked}){
    if(checked !== this.state.checked){
      this.setState({checked})
    }
  }

  _handleToggle = (e) => {            
    const checked = !this.state.checked    
    this.setState({checked}, ()=>this.props.onToggle && this.props.onToggle(checked))
  }

  render(){    
    const {
      style, buttonStyle, iconStyle,
      title, titleStyle,    
      trueText = 'Public',
      falseText = 'Private',               
      trueIcon = <Icon style={{...styles.trueIcon, ...iconStyle}} name="unlock" />, 
      falseIcon = <Icon style={{...styles.falseIcon, ...iconStyle}} name="lock" />
    } = this.props    

    return (
      <View style={{...styles.container, ...style}}>                        
        <Text style={titleStyle}>{title}</Text>        
        <Button style={{...styles.button, ...buttonStyle}} transparent iconRight onPress={this._handleToggle}>      
            <Text style={titleStyle}>{this.state.checked ? trueText : falseText}</Text>
            {this.state.checked ? trueIcon : falseIcon}
        </Button>          
      </View>
    )
  }
}