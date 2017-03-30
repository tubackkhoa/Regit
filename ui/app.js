import React, { Component } from 'react'
import { Navigator, NativeModules, StatusBar, View, Platform } from 'react-native'

import routes from './routes'
import {Content, Text} from 'native-base'
import Container from './components/Container'

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
    static configureScene(route) {
        // use default as PushFromRight, do not use HorizontalSwipeJump or it can lead to swipe horizontal unwanted
        return Navigator.SceneConfigs[route.animationType || 'PushFromRight']
    }

    renderScene = (route, navigator) => {
        return (
            <Container navigator={navigator}>
                <StatusBar 
                  hidden={ route.hiddenBar || (this.props.drawerState === 'opened' && Platform.OS === 'ios')}
                  translucent />                
                    <route.Page
                        route={route}
                        navigator={navigator}
                    />                
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

