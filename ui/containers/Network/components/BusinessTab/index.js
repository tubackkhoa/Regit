import React, { Component } from 'react'
import {                 
    Button, Container, ListItem, TabHeading, Thumbnail,
    Text, Item, View, Input, Left, Body, Tab, Right, Form,
} from 'native-base'

import Modal from '~/ui/components/Modal'
import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
// import * as commonActions from '~/store/actions/common'
import * as accountSelectors from '~/store/selectors/account'

import Icon from '~/ui/elements/Icon'
import material from '~/theme/variables/material'
import options from './options'
import { getTextParts } from '../shared/utils'
import styles from '../shared/styles'

import { API_BASE } from '~/store/constants/api'

const renderTextParts = text => {
  const parts = getTextParts(text)
  return (
    <Text small>
      {parts[0]}
      {parts[1] && <Text small bold link>{parts[1]}</Text>}
      {parts[2]}
    </Text>  
  )
}

// should use margin not padding to tap
@connect(state=>({  
  profile: accountSelectors.getProfile(state),
}))
export default class extends Component {  

  constructor(props) {
    super(props)

    this.state = {
      modalOpen: false
    }
  }


  showInfo(index){
    this.setState({modalOpen:true})
  }

  renderList(){
    const {profile} = this.props
    const avatar = {uri: (API_BASE + profile.PhotoUrl)}
    return (
      <View rounded style={styles.content} >
        {options.notifications.map((item,index) =>
          <ListItem last={index===options.notifications.length-1} 
            key={index} avatar noBorder style={styles.listItemContainer}>
              <Left>
                  <Thumbnail square style={styles.thumb} source={avatar}/>
              </Left>
              <Body style={{marginLeft:10}}>
                  <Text small>{item.user}</Text>                                          
              </Body>
              <Right style={styles.rightButtonContainer}>                
                <Button style={styles.buttonSmall} onPress={e=>this.showInfo(index)} iconLeft bordered>
                  <Icon style={styles.iconGraySmall} name="follow" />
                  <Text note style={styles.textSmall}>Following</Text> 
                </Button>
                <Button style={styles.buttonSmall} onPress={e=>this.showInfo(index)} iconLeft bordered>
                  <Icon style={styles.iconGraySmall} name="activity-small" />
                  <Text note style={styles.textSmall}>Logs</Text> 
                </Button>
              </Right>
          </ListItem>   
        )} 
      </View>
    )
  }

  // padding for radius not overlapsed
  renderModal(){
    const {profile} = this.props
    const avatar = {uri: (API_BASE + profile.PhotoUrl)}
    return (
      <View regit style={{        
        width: material.deviceWidth - 10,        
        height: material.deviceHeight - 70,  
        paddingBottom:4,
        overflow: 'hidden',   
      }}>
        <ListItem style={styles.itemHeader}>
            <Text style={styles.itemHeaderTextModal}>
              Interaction History with Donkey Donus
            </Text>
            <Button onPress={e=>this.setState({modalOpen:false})} style={{alignSelf:'center'}} transparent noPadder>
              <Icon style={styles.iconGray} name="close" />
            </Button>
        </ListItem>
        <Content>
          <View regit>
            {options.listItems.map((item, index) =>
              <ListItem key={index} style={styles.itemBodyModal} last={index===options.listItems.length-1}>                                                
                <Text style={styles.labelTime} small>{item.date}</Text>  
                <View row style={{      
                  justifyContent: 'flex-end',
                }}>          
                  {renderTextParts(item.title)}                           
                </View>
              </ListItem>
            )}     
          </View>
        </Content>
      </View>      
    )
  }

  // flex means 100%
  render() {    
    return (     
      <View style={{flex:1}}>  
        <Modal onCloseClick={e=>this.setState({modalOpen:false})} open={this.state.modalOpen}>          
            {this.renderModal()}          
        </Modal>                                      
        <Content>                       
          {this.renderList()}                                
        </Content>   
      </View>  
    )
  }
}