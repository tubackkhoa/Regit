import React, { Component } from 'react'

import {     
    Header, 
    Title, 
    Content, 
    Button, 
    Left, 
    Right, 
    Body, 
    Icon, 
    Drawer,
    Container,
    Text,
    Badge,
} from 'native-base'

import Footer from '~/ui/components/Footer'

import { connect } from 'react-redux'
import { openDrawer } from '~/store/actions/common'

@connect(null, {openDrawer})
export default class Home extends Component {

  render() {
    const {route} = this.props
    return (          
       
        <Container>
        
            <Header>
                <Left>
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>{route.title}</Title>
                </Body>
                <Right />
            </Header>

            <Content padder>
                <Text>Footer</Text>
            </Content>

            <Footer />
            
        </Container>
      
    )
  }
}