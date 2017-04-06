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
import { openDrawer } from '~/store/actions/common'

@connect(null, {openDrawer})
export default class Home extends Component {

  render() {
    const {route} = this.props
    return (          
       
        <Container>
        
            <Header 
                left={<Icon name="menu" onPress={this.props.openDrawer}/>}
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