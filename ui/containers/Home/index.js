import React, { Component } from 'react'
import {
    Text,
} from 'react-native'

import {     
    Header, 
    Title, 
    Content, 
    Footer, 
    FooterTab, 
    Button, 
    Left, 
    Right, 
    Body, 
    Icon, 
    Drawer,
    Container,
} from 'native-base'

import { connect } from 'react-redux'
import { openDrawer } from '~/store/actions/common'

@connect(null, {openDrawer})
export default class Home extends Component {
  render() {
      return (          
         
          <Container>
          
              <Header>
                  <Left>
                      <Button transparent onPress={this.props.openDrawer}>
                          <Icon name='menu' />
                      </Button>
                  </Left>
                  <Body>
                      <Title>Header</Title>
                  </Body>
                  <Right />
              </Header>

              <Content>
                  
              </Content>

              <Footer>
                  <FooterTab>
                      <Button full>
                          <Text>Footer</Text>
                      </Button>
                  </FooterTab>
              </Footer>
              
          </Container>
        
      )
  }
}