import React, { Component } from 'react'
import { connect } from 'react-redux'
import {         
    Header, Left, Right, Body,           
    Text, Title, Button, Item, Input,
} from 'native-base'

import * as commonActions from '~/store/actions/common'

import Icon from '~/ui/elements/Icon'
import styles from './styles'

@connect(null, commonActions)
export default class extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      type: props.type,
      title: props.title,
    }
  }

  show(type, title){
    this.setState({type, title})
  } 

  _leftClick = (e)=>{
    const {onLeftClick} = this.props
    onLeftClick && onLeftClick(this.state.type)
  }

  renderHeaderBack(title){    
    const left = (
      <Button transparent onPress={this._leftClick}>
        <Icon name="keyboard-arrow-left"/>
      </Button>
    )
    const center = (
      <Title full>{title}</Title>
    )
    return this.renderHeader(left, center)    
  }

  // public data not event
  renderHeaderSearch(iconName="menu"){    
    const left = (
      <Button transparent onPress={this._leftClick}>
        <Icon style={styles.menuIcon} name={iconName}/>
      </Button>
    )
    const center = (
      <Item style={styles.searchContainer}>
          <Icon name="search" style={styles.searchIcon} />
          <Input autoCorrect={false} onChangeText={value=>this.props.search(value)} placeholderTextColor="#a7e7ff" style={styles.searchInput} placeholder="Regit Search" />                        
      </Item>
    )
    const right = (
      <Button transparent>
        <Icon style={styles.uploadIcon} name="cloud-upload"/>
      </Button>
    )
    return this.renderHeader(left, center, right)    
  }

  renderHeader(left, center, right, props) {    
    return (                             
      <Header noShadow {...props} style={styles.container}>          
        <Left>{left}</Left>
        <Body>{center}</Body>
        <Right>{right}</Right>
      </Header>     
    )
  }

  render(){
    // events will be 
    const {type, title} = this.state    
    // event will be invoke via pageInstance
    switch(type){
      case 'none':      
        return false
      case 'back':
        return this.renderHeaderBack(title)
      case 'searchBack':
        return this.renderHeaderSearch('keyboard-arrow-left')
      default:
        return this.renderHeaderSearch()
    } 
  }
}

