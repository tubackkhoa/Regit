import React, { Component } from 'react'

import {         
    Button,    
    Icon,
} from 'native-base'

import { connect } from 'react-redux'

import Header from '~/ui/components/Header'

import { goBack } from '~/store/actions/common'

@connect(null, { goBack })
export default class extends Component {

  render() {
    const {goBack:goBackAction, ...props} = this.props
    return (                             
      <Header 
        left={
          <Button transparent onPress={e=>goBackAction()}>
            <Icon name="keyboard-arrow-left"/>
          </Button>
        }
        {...props}                         
      />  
    )
  }
}




 