import React, { Component } from 'react'
import { NativeModules, StatusBar, Platform } from 'react-native'

import routes from './routes'
import Container from './components/Container'
import Navigator from './components/Navigator'
import Toasts from './components/Toasts'
// router => render component base on url
// history.push => location match => return component using navigator push

import { connect } from 'react-redux'

// should show error if not found
import { getDrawerState } from '~/store/selectors/common'
import { isLogged } from '~/store/selectors/auth'

const UIManager = NativeModules.UIManager

@connect(state=>({
  loggedIn: isLogged(state),
  drawerState: getDrawerState(state),
}))
export default class App extends Component {    

    renderScene = (route, navigator) => {
        return (
            <Container showDrawer={this.props.loggedIn} navigator={navigator}>
                <StatusBar 
                  hidden={ route.hiddenBar || (this.props.drawerState === 'opened' && Platform.OS === 'ios')}
                  translucent />                
                    <route.Page
                        route={route}
                        navigator={navigator}
                    />
                <Toasts/>                
            </Container>
        )
    }

    componentWillMount() {
        UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true)        
    }

    render() {
      const {loggedIn} = this.props
        return (            
            <Navigator
                configureScene={App.configureScene}
                initialRoute={loggedIn ? routes.home : routes.login}
                renderScene={this.renderScene}                
            />
            
        )
    }
}

