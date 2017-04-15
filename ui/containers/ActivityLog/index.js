import React, { Component } from 'react'
// import { RefreshControl } from 'react-native'
import {             
    Button, List, ListItem, Switch,
    Container, Text, Item, Input, Left, Body, Right, View,
} from 'native-base'

import Content from '~/ui/components/Content'
import Modal from '~/ui/components/Modal'
import Icon from '~/ui/elements/Icon'
// import { connect } from 'react-redux'
// import { Field, reduxForm } from 'redux-form'

// import * as commonActions from '~/store/actions/common'

import options from './options'
import styles from './styles'


export default class extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      modalOpen: false
    }
  }

  renderOption(option, key){    
    return (
      <View regit style={styles.container} key={key}>
        <ListItem style={styles.itemHeader}>
            <Text note style={styles.itemHeaderText}>{option.title}</Text>
        </ListItem>
        {option.items.map((item, index) =>
          <ListItem key={index} style={styles.itemBody} last={index===option.items.length-1}>                                                
            <View>
              <Text small>
                {item.title}
                {item.user && <Text small bold active> {item.user}</Text>}
              </Text>
              <Text style={styles.labelTime} note small>{item.time}</Text>
            </View>            
            <Button style={styles.buttonCenter} iconRight noPadder transparent>
              <Icon gray style={styles.iconRight} name="keyboard-arrow-down" />                        
            </Button>              
          </ListItem>
        )}          
      </View>
    )
  }

  renderModal(){
    return (
      <View regit>
        <ListItem>
          <Left>
            <Icon style={styles.iconFilterActive} name="activities" />                                    
            <Text active>All activities</Text>
          </Left>                               
          <Icon style={styles.iconFilterActive} name="done" />                
        </ListItem>
        {options.filterItems.map((item, index)=>
          <ListItem key={index}>
            <Left>
              <Icon style={styles.iconFilterNormal} name={item.icon} />                                    
              <Text>{item.name}</Text>
            </Left>                               
            <Icon style={styles.iconFilterNormal} name="done" />                
          </ListItem>
        )}
      </View>
    )
  }

  render() {
    const {route} = this.props       
    return (                 
        <Container>           
          <Modal title="Activity Log Filter" onLeftClick={e=>this.setState({modalOpen:false})} open={this.state.modalOpen}>
            {this.renderModal()}
          </Modal>         
          <Content padder>
            <View regit style={styles.filterContainer}>
              <Button block transparent onPress={e=>this.setState({modalOpen:true})} >
                <Icon style={styles.iconFilter} name="filter" />
                <Text link bold>Filter</Text>
              </Button>
            </View>
            <Button transparent style={styles.buttonClear}>
              <Text small link>Clear all</Text>
            </Button>
            {options.listItems.map((item, index)=>this.renderOption(item, index))}
          </Content>                   
        </Container>      
    )
  }
}