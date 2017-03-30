import React, { Component } from 'react'
import { Navigator, NativeModules, StatusBar, View } from 'react-native'

import routes from './routes'
import {Container, Content, Text} from 'native-base'

import myTheme from './themes/base-theme'
// router => render component base on url
// history.push => location match => return component using navigator push

const UIManager = NativeModules.UIManager

export default class App extends Component {
    static configureScene(route) {
        // use default as PushFromRight, do not use HorizontalSwipeJump or it can lead to swipe horizontal unwanted
        return Navigator.SceneConfigs[route.animationType || 'PushFromRight']
    }

    static renderScene(route, navigator) {
        return (
            <Container>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
                <Content theme={myTheme}>
                    <route.Page
                        route={route}
                        navigator={navigator}
                    />
                </Content>
            </Container>
        )
    }

    componentWillMount() {
        UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true)        
    }

    render() {
        return (
            
            <Navigator
                configureScene={App.configureScene}
                initialRoute={routes.home}
                renderScene={App.renderScene}                
            />
            
        )
    }
}

