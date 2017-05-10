import React, { Component } from 'react'
import {             
    Button, List, ListItem, Switch,
    Container, Text, Item, Input, Left, Body, Right, View,
} from 'native-base'

import Icon from '~/ui/elements/Icon'
import IconMessage from '~/ui/elements/IconMessage'
import { API_BASE } from '~/store/constants/api'

import options from './options'
import styles from '../shared/styles'
import material from '~/theme/variables/material'

export default class extends Component {  

  renderItem(type, value){
    // display for group value and isolated value
    switch(type){
      case 'field':
        return (
          <Text small>{value}</Text>
        )
      case 'group':
        return (
          <View>    
            {value.map((subValue, index)=>
              <View row key={index}>
                <Text bold small>{subValue.label}:</Text>
                <Text small> {subValue.value}</Text>
              </View>
            )}    
          </View>
        )
    }                                            
        
  }

  render(){
    const {data} = this.props
    return (
      <View regit style={{
        marginTop: 10,
      }}>

        <ListItem style={styles.itemHeader}>
            <Text bold note style={styles.itemHeaderText}>
              {data.title}
            </Text>
            <Button style={styles.itemHeaderButton} transparent>
              <Icon style={styles.iconGray} name="edit" />
            </Button>
        </ListItem>                    
        {data.value.map((value, index)=>
          <ListItem key={index} style={{...styles.itemBody, height: options.heightMap[data.type] || null}}>                                                
            {this.renderItem(data.type, value)}
            <Button style={styles.itemHeaderButton} transparent onPress={this.props.onCopy}>
              <IconMessage size={9} color={material.grayColor} icon="copy" message="Copy" />
            </Button>
          </ListItem>           
        )}                  
      </View>   
    )
  }
  
}