import React, { Component } from 'react'
// import Relay, {
//   DefaultNetworkLayer,
// } from 'react-relay'

// import { API_BASE } from '~/store/constants/api'

import App from './app'
import { Provider } from 'react-redux'
import configureStore from '~/store/config'

// Relay.injectNetworkLayer(
//   new DefaultNetworkLayer(`${API_BASE}/graphql`)
// )

export default class Regit extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      store: null,
    }    
    configureStore(store=> this.setState({store}))
  }

  render() {    
    const {store} = this.state
    // should have a pre-load page
    if(!store)
      return false

    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
} 