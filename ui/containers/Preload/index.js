import React, { Component } from 'react'
import { View, Spinner } from 'native-base'
import material from '~/theme/variables/material'
import styles from './styles'

export default class extends Component {
  
  render(){
    return (
      <View style={styles.container}>
        <Spinner color={material.tabBarActiveTextColor} />
      </View>
    )
  }
}