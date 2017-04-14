import React, { Component } from 'react'
import { NativeModules, StatusBar, Navigator } from 'react-native'
import { Drawer, StyleProvider } from 'native-base'

import getTheme from '~/theme/components'
import material from '~/theme/variables/material'

// import Container from './components/Container'
// import Navigator from './components/Navigator'
import Toasts from './components/Toasts'
import AfterInteractions from './components/AfterInteractions'
import SideBar from './components/SideBar'
import Preload from './containers/Preload'
import HeaderSearchBar from '~/ui/components/HeaderSearchBar'
import HeaderBack from '~/ui/components/HeaderBack'
import Footer from '~/ui/components/Footer'

// router => render component base on url
// history.push => location match => return component using navigator push
import { matchPath } from 'react-router'
import { connect } from 'react-redux'

// should show error if not found
import { getDrawerState, getRouter } from '~/store/selectors/common'
import { closeDrawer } from '~/store/actions/common'
import routes from './routes'

const getPage = (pathname) => {  
  for(route in routes) {
    const match = matchPath(pathname, {
      path:route,
      exact: true,
      strict: false,
    })
    if(match) {      
      return {...routes[route], ...match}
    }
  }  
}

const UIManager = NativeModules.UIManager

@connect(state=>({
  router: getRouter(state),
  drawerState: getDrawerState(state),
}), { closeDrawer })
export default class App extends Component {    

  static configureScene(route) {
      // use default as PushFromRight, do not use HorizontalSwipeJump or it can lead to swipe horizontal unwanted
      return {
        ...Navigator.SceneConfigs[route.animationType || 'PushFromRight'], 
        gestures: null,
        defaultTransitionVelocity: 20,
      }
  }

  constructor(props) {
    super(props)        
    // default is not found page, render must show error
    this.page = getPage(props.router.route) || routes.notFound            
  }

  // replace view from stack, hard code but have high performance
  componentWillReceiveProps({router}){         
    if(router.route !== this.props.router.route){                
      this.page = getPage(router.route)      
      if(this.page){   
          // return console.warn('Not found: ' + router.route)
        // check if page is mounted
        const destIndex = this.navigator.state.routeStack
          .findIndex(route => route.path === this.page.path)

        // console.log(destIndex, this.navigator.state.presentedIndex, this.navigator.state.routeStack)      
        if(destIndex !==-1){
          // this.navigator.jumpTo(page)
          this.navigator._jumpN(destIndex - this.navigator.state.presentedIndex)
        } else {        
          this.navigator.state.presentedIndex = this.navigator.state.routeStack.length
          this.navigator.push(this.page)
        }  
      } else {
        // no need to push to route
        this.page = routes.notFound 
      }         
    }
  }

  // we can use events to pass between header and footer and page via App container or store
  renderScene = (route, navigator) => {   
    if(this.page.path && route.path !== this.page.path) {
      console.log('will focus')
    }  else {          
      // console.log('ngon')
      // we only pass this.page, route and navigator is for mapping or some event like will focus ...
      return (                                           
        <AfterInteractions placeholder={this.page.Preload || <Preload/>}>             
          <this.page.Page route={this.page}/>
        </AfterInteractions>            
      )
    }
  }

  // events will be 
  renderHeader({headerType, title}){
    // event will be invoke via pageInstance
    switch(headerType){
      case 'none':      
        return false
      case 'back':
        return <HeaderBack center={title}/>
      default:
        return <HeaderSearchBar/>
    }    
  }

  renderFooter({footerType}){
    switch(footerType){
      case 'none':      
        return false
      default:
        return <Footer/>
    }    
  }


  componentWillMount() {
      UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true)        
  }

  render() {    
    const {router, drawerState} = this.props    
    return (            
      <StyleProvider style={getTheme(material)}>  
        <Drawer
          open={drawerState === 'opened'}
          type="displace"             
          tweenDuration={200}
          content={<SideBar/>}
          onClose={this.props.closeDrawer}
        >           
          <StatusBar hidden={ this.page.hiddenBar || (drawerState === 'opened' && material.platform === 'ios')} translucent />
          {this.renderHeader(this.page)}
          <Navigator ref={item=>this.navigator=item}
              configureScene={this.constructor.configureScene}
              initialRoute={this.page}
              renderScene={this.renderScene}                
          />
          {this.renderFooter(this.page)}
          <Toasts/>
        </Drawer>   
      </StyleProvider>          
    )
  }
}

