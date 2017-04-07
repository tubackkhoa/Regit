import React, { Component } from 'react'

import {         
    Header as HeaderNB, 
    Left,
    Right,
    Body,           
    Text,
    Title,    
} from 'native-base'


export default class Header extends Component {

  render() {

    const {left, right, center} = this.props
    return (                             
      <HeaderNB>          
        <Left>{left}</Left>
        <Body>
          <Title full>{center}</Title>
        </Body>
        <Right>{right}</Right>
      </HeaderNB>     
    )
  }
}

