import React, { Component } from 'react'
import {             
    Button, List, ListItem, Switch,
    Container, Text, Item, Input, Left, Body, Right, View,
} from 'native-base'

import Icon from '~/ui/elements/Icon'
import IconMessage from '~/ui/elements/IconMessage'
import Content from '~/ui/components/Content'

import { connect } from 'react-redux'

import * as commonActions from '~/store/actions/common'

import styles from './styles'
import material from '~/theme/variables/material'

const copiedMessage = (
  <IconMessage size={30} message="Copied   " />
)

@connect(null, commonActions)
export default class extends Component {

  _onCopy = (e)=>{
    this.props.setToast(copiedMessage, 'info', 500, 'center')
  }

  renderSearchResult(){
    const {setToast} = this.props    
    return (
      <View regit style={{
        marginTop: 10,
      }}>
        <ListItem style={styles.itemHeader}>
            <Text bold note style={styles.itemHeaderText}>
              Home phone
            </Text>
            <Button style={styles.itemHeaderButton} transparent>
              <Icon style={styles.iconGray} name="edit" />
            </Button>
        </ListItem>                    
        <ListItem style={styles.itemBody}>                                                
          <Text small>+61 90187400</Text>  
          <Button style={styles.itemHeaderButton} transparent onPress={this._onCopy}>
            <IconMessage size={9} color={material.grayColor} icon="copy" message="Copy" />
          </Button>
        </ListItem>  
        <ListItem style={styles.itemBody} last>                                                
          <Text small>+61 90187400</Text>  
          <Button style={styles.itemHeaderButton} transparent onPress={this._onCopy}>
            <IconMessage size={9} color={material.tabBarActiveTextColor} icon="copy" message="Copy" />
          </Button>
        </ListItem>            
      </View>   
    )
  }

  renderSearchResultAddress(){
    const {setToast} = this.props    
    return (
      <View regit style={{
        marginTop: 10,
      }}>
        <ListItem style={styles.itemHeader}>
            <Text bold note style={styles.itemHeaderText}>
              Current Address
            </Text>
            <Button style={styles.itemHeaderButton} transparent>
              <Icon style={styles.iconGray} name="edit" />
            </Button>
        </ListItem>    
        <ListItem style={{...styles.itemBody,height:null}} last>    
          <View>                                            
            <Text bold small>My Sweet Home</Text>  
            <Text small>Empire Building</Text>  
            <Text small>Middel Road</Text>  
            <Text small>Singapore</Text>  
          </View>
          <Button style={styles.itemHeaderButton} transparent onPress={this._onCopy}>
            <IconMessage size={9} color={material.grayColor} icon="copy" message="Copy" />
          </Button>
        </ListItem>            
      </View>   
    )
  }

  render() {
       
    return (                 
        <Container>                    
            <Content padder>
               {this.renderSearchResult()}
               {this.renderSearchResultAddress()}
            </Content>                   
        </Container>      
    )
  }
}