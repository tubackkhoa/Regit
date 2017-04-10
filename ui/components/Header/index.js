import React, { Component } from 'react'

import {         
    Header, 
    Left,
    Right,
    Body,           
    Text,
    Title,    
} from 'native-base'

import styles from './styles'

export default class extends Component {

  render() {

    const {left, right, center, ...props} = this.props
    return (                             
      <Header noShadow {...props} style={styles.container}>          
        <Left>{left}</Left>
        <Body>
          {typeof center === 'string' ? <Title full>{center}</Title> : center}
        </Body>
        <Right>{right}</Right>
      </Header>     
    )
  }
}

