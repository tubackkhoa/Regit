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
import SheetButton from '~/ui/elements/SheetButton'
import material from '~/theme/variables/material'
import options from './options'
import { getPopoverOptions } from '~/ui/shared/utils'
import styles from '../shared/styles'

import { Field, reduxForm } from 'redux-form'

import {     
  CheckBoxField,
} from '~/ui/elements/Form'

import { validate } from './utils'

import { API_BASE } from '~/store/constants/api'
// should use margin not padding to tap
@connect(state=>({
  initialValues: {
  },
  profile: accountSelectors.getProfile(state),
}))
@reduxForm({ form: 'TrustedNetworkForm', validate})
export default class extends Component {  

  constructor(props) {
    super(props)

    this.state = {
      modalOpen: false
    }

    this.listItems = []

    this.popMenu = (
      <View regit style={{padding:0}}>
        <ListItem style={styles.listPopItemContainer}>
          <Button onPress={e=>this.handleAction('edit')} noPadder dark transparent>
            <Text small>Edit</Text>
          </Button>
        </ListItem>
        <ListItem style={styles.listPopItemContainer}>
          <Button onPress={e=>this.handleAction('move')} noPadder dark transparent>
            <Text small>Move to Normal</Text>
          </Button>
        </ListItem>
        <ListItem style={styles.listPopItemContainer}>
          <Button onPress={e=>this.handleAction('message')} noPadder dark transparent>
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
    switch(action){
      case 'edit':
        this.setState({modalOpen:true})
        break;
      default:        
        break;  
    }    
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

  renderSelect(item) {
    return (      
      <SheetButton style={styles.actionSheet} textStyle={styles.actionSheetText} iconStyle={styles.actionSheetIcon} items={item.items} 
        onSelected={value => this.setState({ [item.name]: value })}
      >
       {this.state[item.name]} 
      </SheetButton>      
    )
  }

  renderModal(){
    const {profile} = this.props
    const avatar = {uri: (API_BASE + profile.PhotoUrl)}
    return (
      <View regit padder style={{        
        width: material.deviceWidth - 40,
        paddingTop: 10,
        paddingRight:10,
        paddingLeft:10,        
      }}>
        
        <View row>
          <Thumbnail style={{
            width: 40,
            height: 40,
            margin: 10,
          }} square source={avatar}/>  
          <Text small>{profile.DisplayName}</Text>
        </View>
        <Form>                      
          {this.renderSelect(options.selects[0])}
          <View padder style={{paddingLeft:0,marginBottom:-10,marginTop:10}}>
          <Field label={
              <Text small>Select this member as an emergency contact</Text>              
            } large square name="agree" component={CheckBoxField}/> 
          </View> 
          {this.renderSelect(options.selects[1])}
          <View style={styles.buttonContainer}>
            <Button block onPress={e=>this.setState({modalOpen:false})} style={styles.cancelButton}>
                <Text>Cancel</Text>
            </Button>
            <Button block onPress={e=>this.setState({modalOpen:false})} style={styles.okButton}>
                <Text>Change</Text>
            </Button>
          </View>
        </Form>
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