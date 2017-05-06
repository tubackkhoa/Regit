import React, { Component } from 'react'
import {             
    Button, List, ListItem, Switch,
    Container, Text, Item, Input, Left, Body, Right, View,
} from 'native-base'

import Icon from '~/ui/elements/Icon'
import Toggle from '~/ui/components/Toggle'

import moment from 'moment'

import styles from '../shared/styles'

const formatItem = item => value => 
  value.constructor.name === 'Array' ? value.join(', ') : (value + (item.unit ? ' ' + item.unit : ''))

export default class extends Component {

  renderSubItem({label, value}, formatFn, key){
    const displayValue = formatFn ? formatFn(value) : value
    return (
      displayValue &&
      <Text key={key} small><Text small bold>{label}:</Text> {displayValue}{"\n"}</Text>
    ) 
  }

  renderItem(value, privacy){    
    return (
      <ListItem style={{...styles.itemBody, height: null}} last={true}>                                                
        
        <View>          
          <Text>
            {Object.keys(value).map(key=> this.renderSubItem(value[key], formatItem(value[key]), key))}     
          </Text>                              
        </View>        
        
        <Toggle style={{...styles.toggleSmall, alignSelf:'flex-start',marginTop:-5}} iconStyle={styles.iconSmall} titleStyle={styles.label} 
            trueText={''} falseText={''} checked={!privacy} />
        
      </ListItem> 
    ) 
  }

  renderOther({label, value, privacy}){
    // do not return 0, other wise must be wrapped in Text
    return (value &&
      <View regit style={{
        marginTop: 10,
        marginBottom: 10,        
      }}>

        <ListItem style={styles.itemHeaderLarge}>
            <Button style={styles.itemHeaderButton} transparent>
              <Icon style={styles.iconPush} name="cloud-upload" />
            </Button>
            <Text style={{textAlign:'center'}}>{label}</Text>
            <Button style={styles.itemHeaderButton} transparent>
              <Icon style={styles.iconGray} name="edit" />
            </Button>
        </ListItem>                    
        
        
        {this.renderItem(value, privacy)}
        
               
      </View>  
    )
  }

  render(){
    const {vaultInfo} = this.props
    const {
      preference, favourite, body,
    } = vaultInfo.value
    return (
      <View>
      {this.renderOther(preference)}
      {this.renderOther(favourite)}
      {this.renderOther(body)}
      </View>
      
    )
  }
}