import React, { Component } from 'react'
import { NativeModules, StatusBar, Platform } from 'react-native'

import Container from './components/Container'
import Navigator from './components/Navigator'
import Toasts from './components/Toasts'
// router => render component base on url
// history.push => location match => return component using navigator push

import { connect } from 'react-redux'

// should show error if not found
import { getDrawerState, getRouter } from '~/store/selectors/common'
import { isLogged } from '~/store/selectors/auth'

const UIManager = NativeModules.UIManager

@connect(state=>({
  loggedIn: isLogged(state),
  router: getRouter(state),
  drawerState: getDrawerState(state),
}))
export default class App extends Component {    

    renderScene = (page) => {      
        
        return (
            <Container showDrawer={this.props.loggedIn}>
                <StatusBar 
                  hidden={ page.hiddenBar || (this.props.drawerState === 'opened' && Platform.OS === 'ios')}
                  translucent />                
                    <page.Page route={page}/>
                <Toasts/>                
            </Container>
        )
    }

    componentWillMount() {
        UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true)        
    }

    render() {
      const {loggedIn, router} = this.props
        return (            
            <Navigator                
                initialRoute={router.route}
                renderScene={this.renderScene}                
            />
            
        )
    }
}

