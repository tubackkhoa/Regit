import React, { Component } from 'react'
import {                 
    Button,         
    Icon,     
    Container,
    Text,    
    Item,
    View,
    Input,
} from 'native-base'

import Footer from '~/ui/components/Footer'
import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import Event from '~/ui/components/Event'
import HeaderSearchBar from '~/ui/components/HeaderSearchBar'

import styles from './styles'

@connect(null, {...commonActions})
export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh =() => {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 2000);
  }    

  render() {
    
    return (          
       
        <Container>
        
            <HeaderSearchBar/>

            <Content padder refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}                
            >              
              <Event />              
            </Content>

            <Footer />
            
        </Container>
      
    )
  }
}