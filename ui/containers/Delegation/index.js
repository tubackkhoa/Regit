import React, { Component } from 'react'
import {                 
    Button, Container, ListItem, List, TabHeading,
    Text, Item, View, Input, Left, Body, Tab, Tabs,
} from 'native-base'

import Footer from '~/ui/components/Footer'
import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import Header from '~/ui/components/Header'

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

    const {goBack, route} = this.props
    
    return (          
       
        <Container>
        
            <Header hasTabs
              left={
                <Button transparent onPress={e=>goBack()}>
                  <Icon name="keyboard-arrow-left"/>
                </Button>
              }
              center={route.title}                         
            />  

            <Tabs>
                <Tab heading={<TabHeading><Text >WHO YOU DELEGATED TO</Text></TabHeading>}>
                    <Content style={styles.container} refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}                
                    >              
                      <List dataArray={options.notifications} renderRow={item =>
                        <ListItem icon noBorder style={styles.listItemContainer}>
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
                      }/>      

                    </Content>
                </Tab>
                <Tab heading="WHO HAS DELEGATED TO YOU">
                    <Text>Ngon</Text>
                </Tab>
            </Tabs>

            

            <Footer />
            
        </Container>
      
    )
  }
}