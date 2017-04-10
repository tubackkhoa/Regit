import React, { Component } from 'react'
import {                 
    Button, Container, ListItem, List,
    Text, Item, View, Input, Left, Body,
} from 'native-base'

import Footer from '~/ui/components/Footer'
import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import HeaderSearchBar from '~/ui/components/HeaderSearchBar'

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
        
            <HeaderSearchBar/>

            <Content style={styles.container} refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}                
            >              
              <List dataArray={options.notifications} renderRow={item =>
                <ListItem icon style={styles.listItemContainer}>
                    <Left>
                        <Icon name={item.icon} style={styles.icon}/>
                    </Left>
                    <Body style={{borderBottomWidth:0}}>
                        <View style={{flexDirection: 'row'}}>
                          <Text small bold>{item.user} </Text>
                          <Text small>{item.message}</Text>
                        </View>
                        <Text note small>{item.time}</Text>
                    </Body>
                </ListItem>   
              }/>      

            </Content>

            <Footer />
            
        </Container>
      
    )
  }
}