import React, { Component } from 'react'
import {                 
    Button, Container, ListItem,
    Text, Item, View, Input, Left, Body,
} from 'native-base'

import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'

import Icon from '~/ui/elements/Icon'

import options from './options'
import styles from './styles'

@connect(null, {...commonActions})
export default class extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
    }
  }

  _onRefresh =() => {
    this.setState({refreshing: true})
    setTimeout(() => {
      this.setState({refreshing: false})
    }, 2000)
  }    

  render() {
    
    return (          
       
        <Container>
                    

            <Content style={styles.container} refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}                
            >              
              {options.notifications.map((item,index) =>
                <ListItem key={index} icon noBorder style={styles.listItemContainer}>
                    <Left>
                        <Icon name={item.icon} style={styles.icon}/>
                    </Left>
                    <Body>
                        <Text small>
                          <Text small bold>{item.user}</Text> {item.message}
                        </Text>                        
                        <Text note small>{item.time}</Text>
                    </Body>
                </ListItem>   
              )}   

            </Content>
            
            
        </Container>
      
    )
  }
}