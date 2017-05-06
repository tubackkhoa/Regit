import React, { Component } from 'react'
import {             
    Button, List, ListItem, Switch,
    Container, Text, Item, Input, Left, Body, Right, View,
} from 'native-base'

import Icon from '~/ui/elements/Icon'
import Toggle from '~/ui/components/Toggle'

import moment from 'moment'

import styles from '../shared/styles'


export default class extends Component {

  renderSubItem({label, value}, formatFn){
    const displayValue = formatFn ? formatFn(value) : value
    return (
      displayValue &&
      <Text small><Text small bold>{label}:</Text> {displayValue}{"\n"}</Text>
    ) 
  }

  renderItem({
    description, firstName, middleName, lastName, dob,
     gender, email, relationship,
     note, privacy, _default}, index, last=false){    
    
    return (
      <ListItem style={{...styles.itemBody, height: null}} key={index} last={last}>                                                
        
        <View>
          {_default &&
          <Button transparent bordered textSmall style={{...styles.buttonSmall, marginLeft:0}}>
            <Text active>DEFAULT</Text>
          </Button>
          } 
          <Text>
            {this.renderSubItem(description)}
            {this.renderSubItem(firstName)}
            {this.renderSubItem(middleName)}
            {this.renderSubItem(lastName)}
            {this.renderSubItem({...dob,label:'Birthday'}, value=>moment(value).format('dddd, MMMM D, YYYY'))}
            {this.renderSubItem(gender)}
            {this.renderSubItem(email)}
            {this.renderSubItem(relationship)}
            {this.renderSubItem(note)}
          </Text>                              
        </View>        
        
        <Toggle style={{...styles.toggleSmall, alignSelf:'flex-start',marginTop:-5}} iconStyle={styles.iconSmall} titleStyle={styles.label} 
            trueText={''} falseText={''} checked={!privacy.value} />
        
      </ListItem> 
    ) 
  }

  renderRelationship({label, value}){
    // do not return 0, other wise must be wrapped in Text
    return (!!value.length &&
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
        
        {value.map((item, index)=>
          this.renderItem(item, index, index === value.length - 1)
        )}   
               
      </View>  
    )
  }

  render(){
    const {vaultInfo} = this.props
    return (
      <View>
      {this.renderRelationship(vaultInfo)}      
      </View>      
    )
  }
}