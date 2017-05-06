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

  renderItem({name}, key, last=false){    
    return (
      <ListItem key={key} last={last} style={{
        ...styles.itemBody, 
        height: 75,
        paddingLeft:15,
        paddingRight:0,
      }}>     
        <Icon gray name="image" />                                                 
        <Text small>{name}</Text>
        <Button transparent>
          <Icon style={{
            fontSize: 18,
          }} gray name="delete" />
        </Button>
      </ListItem> 
    ) 
  }

  render(){
    const {vaultInfo} = this.props
    return (
      <View regit style={{
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 10,
      }}>                           
        
        {vaultInfo.value.map((item, index)=>this.renderItem(item, index, index===vaultInfo.value.length-1))}                 
               
      </View>   
    )
  }
}