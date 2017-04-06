import React, { Component } from 'react'

import {         
    Header as HeaderNB, 
    Left,
    Right,
    Body, 
    Button,         
    Text,
    Title,    
} from 'native-base'


export default class Header extends Component {

  render() {

    const {left, right, center} = this.props
    return (                             
      <HeaderNB>          
        <Left>
          <Button transparent>
          {left}
          </Button>
        </Left>
        <Body>
          <Title full>{center}</Title>
        </Body>
        <Right>
          <Button transparent>
          {right}
          </Button>
        </Right>
      </HeaderNB>     
    )
  }
}

