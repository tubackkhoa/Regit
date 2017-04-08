import React, { Component } from 'react'

import {             
    Content, 
    Button,         
    Icon,     
    Container,
    Text,    
    Item,
    Input,
} from 'native-base'

import Header from '~/ui/components/Header'
import Footer from '~/ui/components/Footer'

import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import Event from '~/ui/components/Event'

import styles from './styles'

@connect(null, {...commonActions})
export default class Home extends Component {

  render() {
    const {route, openDrawer, forwardTo} = this.props
    return (          
       
        <Container>
        
            <Header 
                left={<Button transparent onPress={openDrawer}><Icon name="menu"/></Button>}
                center={
                    <Item style={styles.searchContainer}>
                        <Icon name="search" style={styles.searchIcon} />
                        <Input placeholderTextColor="#a7e7ff" style={styles.searchInput} placeholder="Regit Search" />                        
                    </Item>
                }    
                right={<Button transparent><Icon name="cloud-upload"/></Button>}            
            />

            <Content padder>
                <Event />
            </Content>

            <Footer />
            
        </Container>
      
    )
  }
}