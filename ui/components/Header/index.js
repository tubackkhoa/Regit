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

    const {left, right, center, ...props} = this.props
    return (                             
      <HeaderNB {...props}>          
        <Left>{left}</Left>
        <Body>
          {typeof center === 'string' ? <Title full>{center}</Title> : center}
        </Body>
        <Right>{right}</Right>
      </HeaderNB>     
    )
  }
}

