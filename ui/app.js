import React, { Component } from 'react'
import { BackAndroid, NativeModules, Navigator } from 'react-native'
import { Drawer, StyleProvider } from 'native-base'

import getTheme from '~/theme/components'
import material from '~/theme/variables/material'

// import Container from './components/Container'
// import Navigator from './components/Navigator'
import Toasts from './components/Toasts'
import AfterInteractions from './components/AfterInteractions'
import SideBar from './components/SideBar'
import Preload from './containers/Preload'
import Header from '~/ui/components/Header'
import Footer from '~/ui/components/Footer'
import Popover from '~/ui/components/Popover'

// router => render component base on url
// history.push => location match => return component using navigator push
import { matchPath } from 'react-router'
import { connect } from 'react-redux'

// should show error if not found
import { getDrawerState, getRouter } from '~/store/selectors/common'
import * as commonActions from '~/store/actions/common'
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
}), commonActions)
export default class App extends Component {    

  static configureScene(route) {
      const {animationType = 'PushFromRight'} = routes[route.path] || {}
      // Navigator.SceneConfigs[animationType]
      // use default as PushFromRight, do not use HorizontalSwipeJump or it can lead to swipe horizontal unwanted
      return {
        ...Navigator.SceneConfigs[animationType], 
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
  componentWillReceiveProps({router, drawerState}){         
    // process for route change only
    if(router.route !== this.props.router.route){                
      this.page = getPage(router.route)      
      if(this.page){   
        const {headerType, footerType, title, path} = this.page
        // show header and footer
        this.header.show(headerType, title)
        this.footer.show(footerType, router.route)
        
        // return console.warn('Not found: ' + router.route)
        // check if page is mounted
        const destIndex = this.navigator.state.routeStack
          .findIndex(route => route.path === this.page.path)

        // console.log(this.navigator.state)      
        if(destIndex !==-1){          
          this.navigator._jumpN(destIndex - this.navigator.state.presentedIndex)
        } else {                  
          this.navigator.state.presentedIndex = this.navigator.state.routeStack.length
          this.navigator.push({title, path})
        }  
      } else {
        // no need to push to route
        this.page = routes.notFound
        this.props.setToast('Route not found: ' + router.route, 'danger')
      }         
    }

    // check drawer
    if(drawerState !== this.props.drawerState){
      this.drawer._root[drawerState === 'opened' ? 'open' : 'close']()
    }
  }

  // we handle manually to gain performance
  shouldComponentUpdate(nextProps){
    return false
  }

  // we can use events to pass between header and footer and page via App container or store
  _renderPage = (route) => {   
    if(this.page.path && route.path !== this.page.path) {
      // console.log('will focus')
    }  else {                
      // we only pass this.page, route and navigator is for mapping or some event like will focus ...
      // first time not show please waiting
      if(!this.navigator) {
        return (
          <this.page.Page route={this.page} app={this}/>
        )
      }
      return (                                           
        <AfterInteractions placeholder={this.page.Preload || <Preload/>}>             
          <this.page.Page route={this.page} app={this}/>
        </AfterInteractions>            
      )
    }
  }

  _onLeftClick=(type)=>{
    const {openDrawer, goBack} = this.props
    switch(type){
      case 'none':      
        return false
      case 'back':
      case 'searchBack':
        return goBack()
      default:
        return openDrawer()
    }      
  }

  _onTabClick=(type, route)=>{    
    const {forwardTo} = this.props
    switch(type){
      case 'none':      
        return false
      default:
        return forwardTo(route)
    }    
  }


  componentWillMount() {
      UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true)        
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const {router, goBack} = this.props
      if (router.route === 'home') {
        return false
      }
      // go back
      goBack()
      return true
    })
  }

  render() {    
    const {router, drawerState, closeDrawer} = this.props   
    const {title, path, headerType, footerType} = this.page 
    return (            
      <StyleProvider style={getTheme(material)}>  
        <Drawer
          ref={ref => this.drawer = ref}
          open={drawerState === 'opened'}
          type="displace"             
          tweenDuration={200}
          content={router.route !== 'login' && <SideBar/>}
          onClose={closeDrawer}
        >           
          {
            // each Page will overide StatusBar
            // <StatusBar hidden={ this.page.hiddenBar || (drawerState === 'opened' && material.platform === 'ios')} translucent />          
          }
          <Header type={headerType} title={title} onLeftClick={this._onLeftClick} ref={ref=>this.header=ref} />
          <Navigator ref={ref=>this.navigator=ref}
              configureScene={this.constructor.configureScene}
              initialRoute={{title, path}}
              renderScene={this._renderPage}                
          />
          <Footer type={footerType} route={router.route} onTabClick={this._onTabClick} ref={ref=>this.footer=ref} />
          <Toasts/>
          <Popover ref={ref=>this.popover=ref}/>
        </Drawer>   
      </StyleProvider>          
    )
  }
}

