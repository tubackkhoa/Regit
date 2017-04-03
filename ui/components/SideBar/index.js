import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem, Icon, Container, Left, Right, Badge, Button, View, StyleProvider, getTheme, variables } from 'native-base';

import { logout } from '~/store/actions/auth'
import { forwardTo } from '~/store/actions/common'
import routes from '~/ui/routes'
import { getToken } from '~/store/selectors/auth'
import styles from './styles'

@connect(state=>({
  token: getToken(state)
}), {logout, forwardTo})
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
    this.props.logout(this.props.token)
    // this.props.forwardTo('login')
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