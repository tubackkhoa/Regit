import React, { Component } from 'react'
import {                 
    Button, Container, ListItem, TabHeading, Thumbnail,
    Text, Item, View, Input, Left, Body, Tab, Right,
} from 'native-base'

import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
// import * as commonActions from '~/store/actions/common'
import * as accountSelectors from '~/store/selectors/account'

import Icon from '~/ui/elements/Icon'
import material from '~/theme/variables/material'
import options from './options'
import { getPopoverOptions } from '~/ui/shared/utils'
import styles from '../shared/styles'

import { API_BASE } from '~/store/constants/api'
// should use margin not padding to tap
@connect(state=>({
  profile: accountSelectors.getProfile(state),
}))
export default class extends Component {  

  constructor(props) {
    super(props)

    this.listItems = []

    this.popMenu = (
      <View regit style={{padding:0}}>
        <ListItem style={styles.listPopItemContainer}>
          <Button onPress={e=>this.handleAction('move')} noPadder dark transparent>
            <Text small>Move to Trusted</Text>
          </Button>
        </ListItem>
        <ListItem style={styles.listPopItemContainer}>
          <Button onPress={e=>this.handleAction('move')} noPadder dark transparent>
            <Text small>Message</Text>
          </Button>
        </ListItem>
        <ListItem last style={styles.listPopItemContainer}>
          <Button onPress={e=>this.handleAction('move')} noPadder dark transparent>
            <Text small>Remove</Text>
          </Button>
        </ListItem>
      </View>
    )
  }

  handleAction(action){
    this.props.app.popover.show(false)
  }

  showPopover(index){
    this.listItems[index]._root.measure((ox, oy, width, height, x, y) => {      
      const popoverOptions = getPopoverOptions(200, {x, y, width, height})
      this.props.app.popover.show(this.popMenu, popoverOptions)
    })
  }

  renderList(){
    const {profile} = this.props
    const avatar = {uri: (API_BASE + profile.PhotoUrl)}
    return (
      <View rounded style={styles.content} >
        {options.notifications.map((item,index) =>
          <ListItem ref={ref=>this.listItems[index]=ref} last={index===options.notifications.length-1} 
            key={index} avatar noBorder style={styles.listItemContainer}>
              <Left>
                  <Thumbnail square style={styles.thumb} source={avatar}/>
              </Left>
              <Body style={{marginLeft:10}}>
                  <Text small>{item.user}</Text>                                          
              </Body>
              <Right style={styles.rightContainer}>                
                <Button onPress={e=>this.showPopover(index)} iconRight noPadder transparent>
                  <Icon style={styles.iconGrayLarge} name="edit" /> 
                </Button>
              </Right>
          </ListItem>   
        )} 
      </View>
    )
  }

  // flex means 100%
  render() {    
    return (     
      <View style={{flex:1}}>            
        <Item style={styles.item}>            
            <Input placeholderTextColor={material.inputColorPlaceholder} style={styles.input} placeholder="Type a name" />
            <Button style={styles.buttonSearch}>
              <Text>Invite</Text>
            </Button>
          </Item>                      
        <Content>                       
          {this.renderList()}                                
        </Content>   
      </View>  
    )
  }
}