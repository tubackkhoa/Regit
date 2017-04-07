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


export default class Modal extends Component {

  static defaultProps = {
    title: 'Modal',
  }

  render(){
    const {open, title, children, onButtonPress} = this.props
    return (
      
      <Modal
          animationType="slide"
          transparent={false}
          visible={open}          
        >
        
        <Container>
        
            <Header 
                left={<Button onPress={e=>onButtonPress&&onButtonPress('cancel')} transparent><Text>Cancel</Text></Button>}
                right={<Button onPress={e=>onButtonPress&&onButtonPress('ok')} transparent><Text>OK</Text></Button>}
                center={title}                
            />

            <Content padder>
                {children}
            </Content>            
            
        </Container>

      </Modal>
      
    )
  }
}
