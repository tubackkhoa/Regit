import React, { Component } from 'react'
import { Platform } from 'react-native'
import { connect } from 'react-redux'
import { Content, H2, H3, Text, List, ListItem, Icon as IconNB, 
  Container, Left, Right, Badge, Button, View, StyleProvider, getTheme, variables,
  Spinner, Thumbnail,
} from 'native-base'

import { logout } from '~/store/actions/auth'
import * as accountSelectors from '~/store/selectors/account'
import { forwardTo, setToast, closeDrawer } from '~/store/actions/common'
import routes from '~/ui/routes'
import * as authSelectors from '~/store/selectors/auth'
import { getProfile } from '~/store/actions/account'
import styles from './styles'
import options from './options'

import Icon from '~/ui/elements/Icon'

import {  
  API_BASE
} from '~/store/constants/api'


@connect(state=>({
  token: authSelectors.getToken(state),
  profile: accountSelectors.getProfile(state),
}), {logout, forwardTo, getProfile, setToast, closeDrawer})
export default class SideBar extends Component {

  static propTypes = {
    
  }

  constructor(props) {
    super(props)
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    }
  }

  componentDidMount(){    
    if(!this.props.profile){      
      this.props.getProfile(this.props.token)
    }    
  }

  _handleLogout = (e) => {    
    this.props.logout(this.props.token)       
  }

  _handleEditProfile = (e) => {
    const {forwardTo, closeDrawer} = this.props
    // close drawer then open profile
    closeDrawer()
    forwardTo('user/profile')
  }

  navigateTo(route) {
    this.props.forwardTo(route)
  }

  render() {
    const {profile} = this.props    
    if(!profile)
      return (<Spinner color="green" />)

    // render profile
    const avatar = {uri: (API_BASE + profile.PhotoUrl)}
    return (      
        <Content
          bounces={false}
          style={styles.container}
        >
          <View style={styles.drawerCover}>
            <Thumbnail source={avatar} 
              style={styles.drawerImage}/>
            <H3 style={styles.text}>{profile.DisplayName}</H3>
            <Text style={styles.text}>{profile.Birthdate}</Text>
            <Text style={styles.text}>{profile.City}, {profile.Country}              
            </Text>
            <Icon onPress={this._handleEditProfile} name="edit" style={styles.iconEdit} />
          </View>
          {options.listItems.map(item =>
              <ListItem key={item.route} button onPress={() => this.navigateTo(item.route)} >
                <Left>
                  <Icon name={item.icon} style={styles.icon} />                  
                  <Text style={styles.iconText}>{item.name}</Text>
                </Left>                
              </ListItem>)}
          
          <ListItem noBorder style={styles.listItem} button onPress={this._handleLogout} >
            <Left>                  
              <Text style={styles.iconTextLast}>Log Out</Text>
            </Left>                
          </ListItem>
        </Content>
      
    );
  }
}