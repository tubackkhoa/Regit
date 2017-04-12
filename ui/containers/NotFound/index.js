import React, { Component } from 'react'
import { View, Button, Text, H1 } from 'native-base'
import { connect } from 'react-redux'

// should show error if not found
import { getRouter } from '~/store/selectors/common'
import * as commonActions from '~/store/actions/common' 

import styles from './styles'


@connect(state=>({
  router: getRouter(state),  
}), commonActions)
export default class extends Component {
  
  render(){
    const {router, goBack} = this.props
    return (
      <View style={styles.container}>
        <H1 style={styles.error}>No route: {router.route}</H1>   
        <Text style={styles.error}>Please check at "~/ui/routes.js"</Text>  
        <Button style={styles.goBack} onPress={e=>goBack()}><Text>Go back</Text></Button>
      </View>
    )
  }
}