import React, { Component } from 'react'

import {         
    Button,
    Item,   
    Input,
} from 'native-base'

import Header from '~/ui/components/Header'
import styles from './styles'
import { connect } from 'react-redux'

import Icon from '~/ui/elements/Icon'

import material from '~/theme/variables/material'
import * as commonActions from '~/store/actions/common'

@connect(null, {...commonActions})
export default class extends Component {

  render() {

    const {openDrawer} = this.props
    return (                             
      <Header 
          left={<Button transparent onPress={openDrawer}><Icon style={styles.menuIcon} name="menu"/></Button>}
          center={
              <Item style={styles.searchContainer}>
                  <Icon name="search" style={styles.searchIcon} />
                  <Input placeholderTextColor={material.inputColorPlaceholder} style={styles.searchInput} placeholder="Regit Search" />                        
              </Item>
          }    
          right={<Button transparent><Icon style={styles.uploadIcon} name="cloud-upload"/></Button>}            
      />    
    )
  }
}

