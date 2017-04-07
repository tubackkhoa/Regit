import React, { Component } from 'react'

import {         
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

import Header from '~/ui/components/Header'
import Footer from '~/ui/components/Footer'

import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'

@connect(null, {...commonActions})
export default class Home extends Component {

  render() {
    const {route, openDrawer} = this.props
    return (          
       
        <Container>
        
            <Header 
                left={<Button transparent onPress={openDrawer}><Icon name="menu"/></Button>}
                center={route.title}                
            />

            <Content padder>
                <Text>Home page</Text>
            </Content>

            <Footer />
            
        </Container>
      
    )
  }
}