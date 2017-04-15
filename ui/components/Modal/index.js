import React, { Component } from 'react'
import { Modal } from 'react-native'
import {
  Container,
  Content, 
  Text,
  Icon, 
  Button,
} from 'native-base'
import Header from '~/ui/components/Header'


export default class extends Component {

  static defaultProps = {
    title: 'Modal',
  }

  render(){
    const {open, title, children, onLeftClick} = this.props
    return (
      
      <Modal
          animationType="slide"
          transparent={false}
          visible={open}          
        >          
          <Container>
            <Header type="back" title={title} onLeftClick={onLeftClick}/>
            <Content padder>
                {children}
            </Content>
          </Container>             
      </Modal>
      
    )
  }
}
