import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Content, H2, H3, Text, List, ListItem, Icon, Container, Left, Right, Badge, Button, View, StyleProvider, getTheme, variables } from 'native-base';

import { logout } from '~/store/actions/auth'
import * as accountSelectors from '~/store/selectors/account'
import { forwardTo, setToast } from '~/store/actions/common'
import routes from '~/ui/routes'
import * as authSelectors from '~/store/selectors/auth'
import { getProfile } from '~/store/actions/account'
import styles from './styles'

import {  
  API_BASE
} from '~/store/constants/api'

const datas = [
  {
    name: 'Network',
    route: 'anatomy',
    icon: 'account-box',
  },    
  {
    name: 'Activity Log',
    route: 'picker',
    icon: 'account-box',
  },
  {
    name: 'Account Setting',
    route: 'radio',
    icon: 'account-box',
  },
  {
    name: 'Manage Interaction',
    route: 'searchbar',
    icon: 'account-box',
  },
  {
    name: 'Calendar',
    route: 'spinner',
    icon: 'account-box',
  },
  {
    name: 'Reminder',
    route: 'tab',
    icon: 'account-box',
  },
  {
    name: 'Poll',
    route: 'tabs',
    icon: 'account-box',
  },
  {
    name: 'Help & Support',
    route: 'thumbnail',
    icon: 'account-box',    
  },

];

@connect(state=>({
  token: authSelectors.getToken(state),
  profile: accountSelectors.getProfile(state),
}), {logout, forwardTo, getProfile, setToast})
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

  _handleLogout = (event) => {    
    this.props.logout(this.props.token)       
  }

  navigateTo(route) {

  }

  render() {
    const {profile} = this.props
    console.log(profile)
    return (profile && 
      <Container>
        <Content
          bounces={false}
          style={styles.container}
        >
          <View style={styles.drawerCover}>
            <Image source={{uri: (API_BASE + profile.PhotoUrl)}} 
              style={styles.drawerImage}>
            </Image>
            <H3 style={styles.text}>{profile.DisplayName}</H3>
            <Text style={styles.text}>{profile.Birthdate}</Text>
            <Text style={styles.text}>{profile.City}, {profile.Country}              
            </Text>
            <Icon name="edit" style={styles.iconEdit} />
          </View>
          {datas.map(data =>
              <ListItem key={data.route} style={styles.listItem} button onPress={() => this.navigateTo(data.route)} >
                <Left>
                  <Icon name={data.icon} style={styles.icon} />
                  <Text style={styles.iconText}>{data.name}</Text>
                </Left>                
              </ListItem>)}
          
          <ListItem noBorder style={styles.listItem} button onPress={this._handleLogout} >
            <Left>                  
              <Text style={styles.iconTextLast}>Log Out</Text>
            </Left>                
          </ListItem>
        </Content>
      </Container>
    );
  }
}