import React, { Component } from 'react'
import { Navigator } from 'react-native'

import routes from '~/ui/routes'
import { connect } from 'react-redux'

// should show error if not found
import { getRouter } from '~/store/selectors/common'
import { getPage } from './utils'

@connect(state=>({
  router: getRouter(state),  
}))
export default class extends Component {

    static configureScene(route) {
        // use default as PushFromRight, do not use HorizontalSwipeJump or it can lead to swipe horizontal unwanted
        return {
          ...Navigator.SceneConfigs[route.animationType || 'PushFromRight'], 
          gestures: null,
          defaultTransitionVelocity: 20,
        }
    }

    constructor(props) {
      super(props);          
      // default is not found page, render must show error
      this.page = getPage(props.initialRoute) || routes.notFound            
    }

    // replace view from stack, hard code but have high performance
    componentWillReceiveProps({router}){               
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

    renderScene = (route, navigator) => {   
      if(this.page.path && route.path !== this.page.path) {
        // console.log('will focus')
      }  else {          
        // we only pass this.page, route and navigator is for mapping or some event like will focus ...
        return this.props.renderScene(this.page)
      }
    }

    render() {      
      return (            
        <Navigator ref={item=>this.navigator=item}
            configureScene={this.constructor.configureScene}
            initialRoute={this.page}
            renderScene={this.renderScene}                
        />
          
      )
    }
}

