import React, { Component } from 'react'
import App from './app'
import { Provider } from 'react-redux'
import { Spinner } from 'native-base'
import configureStore from '~/store/config'

export default class Regit extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      store: null,
    }        
  }

  componentDidMount(){
    configureStore(store=> this.setState({store}))
  }

  render() {    
    const {store} = this.state
    // should have a pre-load page
    if(!store)
      return (<Spinner color="green" />)

    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
} 