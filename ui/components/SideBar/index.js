import React, { Component } from 'react'
import { Platform } from 'react-native'
import { connect } from 'react-redux'
import { Content,Text, List, ListItem, Icon as IconNB, 
  Container, Left, Right, Badge, Button, View, StyleProvider, getTheme, variables,
  Spinner, Thumbnail,
} from 'native-base'

import * as authActions from '~/store/actions/auth'
import * as accountSelectors from '~/store/selectors/account'
import * as commonActions from '~/store/actions/common'
import * as authSelectors from '~/store/selectors/auth'
import * as accountActions from '~/store/actions/account'

import options from './options'
import routes from '~/ui/routes'
import Icon from '~/ui/elements/Icon'
import styles from './styles'

import {  
  API_BASE
} from '~/store/constants/api'

@connect(state=>({
  token: authSelectors.getToken(state),
  profile: accountSelectors.getProfile(state),
}), {...authActions, ...accountActions, ...commonActions})
export default class extends Component {

  componentDidMount(){    
    if(!this.props.profile){      
      this.props.getProfile(this.props.token)
    }    
  }

  _handleLogout = (e) => {    
    this.props.logout(this.props.token)       
  }

  navigateTo(route) {
    const {forwardTo, closeDrawer} = this.props
    closeDrawer()
    forwardTo(route)
  }

  render() {
    const {profile, forwardTo} = this.props    
    if(!profile)
      return (<Spinner color="green" />)
    // by default it is flex, so do not set flex portion
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
            <Text large style={styles.text}>{profile.DisplayName}</Text>
            <Text small style={styles.text}>{profile.Birthdate}</Text>
            <View style={styles.editContainer}>
              <Text small style={styles.text}>{profile.City}, {profile.Country}</Text>
              <Icon onPress={e=>this.navigateTo('user/profile')} name="edit" style={styles.iconEdit} />
            </View>
          </View>
          {options.listItems.map(item =>
              <ListItem key={item.route} button onPress={e => this.navigateTo(item.route)} >
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