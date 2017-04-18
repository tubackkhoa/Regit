import React, { Component } from 'react'
import {             
    Button, Icon, List, ListItem, Switch,
    Container, Text, Item, Input, Left, Body, Right, View,
} from 'native-base'

import Content from '~/ui/components/Content'

import { connect } from 'react-redux'

import * as commonActions from '~/store/actions/common'

import styles from './styles'

@connect(null, commonActions)
export default class extends Component {

  render() {
    const {route, setToast} = this.props       
    return (                 
        <Container>                    
            <Content padder>
               <Button onPress={e=>{
                setToast(<Icon name="edit"/>,'info',10000,'center')
               }}>
                 <Text>Click</Text>
               </Button>
            </Content>                   
        </Container>      
    )
  }
}