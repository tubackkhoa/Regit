import React, { Component } from 'react'
import { RefreshControl } from 'react-native'
import {         
    Content, 
    View,    
} from 'native-base'


export default class extends Component {   

  render() {

    const {children, refreshing, onRefresh, padder, ...props} = this.props    
    // show refresh control
    if(onRefresh){
      props.refreshControl = <RefreshControl refreshing={refreshing} onRefresh={onRefresh} title="Loading..." />
    }
    
    return (                             
      <Content {...props} >
        <View padder={padder}>
          {children}
        </View>
      </Content>    
    )
  }
}



