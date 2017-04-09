import React, { Component } from 'react'
import { RefreshControl } from 'react-native'
import {         
    Content, 
    View,    
} from 'native-base'


export default class extends Component {   

  render() {

    const {style, children, ...props} = this.props
    return (                             
      <Content refreshControl={
        <RefreshControl title="Loading..." {...props}/>
      }>
        <View padder>
          {children}
        </View>
      </Content>    
    )
  }
}



