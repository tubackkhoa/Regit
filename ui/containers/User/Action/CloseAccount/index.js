import React, { Component } from 'react'
import {                 
    Button, Form, 
    Container, Text, Item, View, Input,
} from 'native-base'

import Footer from '~/ui/components/Footer'
import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import Header from '~/ui/components/Header'

import WarningButton from '~/ui/elements/WarningButton'
import Icon from '~/ui/elements/Icon'

import styles from '../shared/styles'

@connect(null, {...commonActions })
export default class extends Component {

  render() {
    const {goBack, route} = this.props
    return (          
       
        <Container>
        
            <Header 
              left={
                <Button transparent onPress={e=>goBack()}>
                  <Icon name="keyboard-arrow-left"/>
                </Button>
              }
              center={route.title}                         
            />  

            <Content padder>       

              <WarningButton>WARNING</WarningButton>

              <Text style={styles.textPadder}>
                Are you sure you want to close your accout associated with this email:
                <Text link>dotritai@gmail.com</Text>?                  
              </Text>
              <Text style={styles.textPadder}>
              Be careful. Your account will be permanently deleted after 60 days. You won't be able to restore it later.
              </Text>
            
              <Button large block primary>
                  <Text>Close</Text>
              </Button>
                 
            </Content>

            <Footer />
            
        </Container>
      
    )
  }
}