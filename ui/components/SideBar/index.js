import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem, Icon, Container, Left, Right, Badge, Button, View, StyleProvider, getTheme, variables } from 'native-base';

import { logout } from '~/store/actions/auth'
import routes from '~/ui/routes'
import { closeDrawer } from '~/store/actions/common'
import styles from './styles'

@connect(null, {logout, closeDrawer})
export default class SideBar extends Component {

  static propTypes = {
    
  }

  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
  }

  _handleLogout = (event) => {    
    this.props.logout(()=>this.props.closeDrawer() && this.props.navigator.resetTo(routes.login))
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: '#fff', top: -1 }}
        >
          
          <ListItem itemDivider>
                        <Text>A</Text>
                    </ListItem>
                    <ListItem >
                        <Text>Aaron Bennet</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Ali Connors</Text>
                    </ListItem>
                    <ListItem itemDivider>
                        <Text>B</Text>
                    </ListItem>
                    <ListItem>
                        <Button onPress={this._handleLogout}>
                          <Text>Logout</Text>
                      </Button>
                    </ListItem>

        </Content>
      </Container>
    );
  }
}