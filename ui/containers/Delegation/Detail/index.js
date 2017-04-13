import React, { Component } from 'react'
import {                 
    Button,         
    Icon,     
    Container,
    Text,    
    Item,
    View,
    Input,
} from 'native-base'

import Footer from '~/ui/components/Footer'
import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import Header from '~/ui/components/Header'

import styles from './styles'

@connect(null, {...commonActions})
export default class extends Component {


  render() {
    const {route, goBack} = this.props
    return (          
       
        <Container>
        
            <Header hasTabs
              left={
                <Button transparent onPress={e=>goBack()}>
                  <Icon name="keyboard-arrow-left"/>
                </Button>
              }
              center={route.title}                         
            />  


            <Content padder>              
                <Text>{route.params.id}</Text>
            </Content>

            <Footer />
            
        </Container>
      
    )
  }
}