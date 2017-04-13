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
        return Navigator.SceneConfigs[route.animationType || 'PushFromRight']
    }

    // replace view from stack
    componentWillReceiveProps({router}){           
      const page = getPage(router.route)      
      if(!page)   
        return console.warn('Not found: ' + router.route)
      // check if page is mounted
      const destIndex = this.navigator.getCurrentRoutes()
        .findIndex(route => route.url === page.url)
      // console.log(destIndex, this.navigator.getCurrentRoutes())
      
      if(destIndex !==-1){
        // this.navigator.jumpTo(page)
        this.navigator._jumpN(destIndex - this.navigator.state.presentedIndex);
      } else {        
        this.navigator.push(page) 
      }           
    }

    renderScene = (route, navigator) => {           
        return this.props.renderScene(route, navigator)
    }

    render() {
      const {initialRoute} = this.props
      // default is not found page, render must show error
      const page = getPage(initialRoute) || routes.notFound            
      return (            
        <Navigator ref={item=>this.navigator=item}
            configureScene={this.constructor.configureScene}
            initialRoute={page}
            renderScene={this.renderScene}                
        />
          
      )
    }
}

