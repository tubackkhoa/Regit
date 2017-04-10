import React, { Component } from 'react'
import { RefreshControl } from 'react-native'
import {         
    Content, 
    View,    
} from 'native-base'


export default class extends Component {   

  render() {

    const {style, children, refreshing, onRefresh, ...props} = this.props    
    // show refresh control
    if(onRefresh) {
      Object.assign(props,{
        refreshControl: <RefreshControl refreshing={refreshing} onRefresh={onRefresh} title="Loading..." />
      })
    }
    return (                             
      <Content {...props} >
        <View padder>
          {children}
        </View>
      </Content>    
    )
  }
}



