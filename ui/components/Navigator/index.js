import React, { Component } from 'react'
import { Navigator as NavigatorRN} from 'react-native'

import routes from '~/ui/routes'
import { connect } from 'react-redux'

// should show error if not found
import { getRouter } from '~/store/selectors/common'

@connect(state=>({
  router: getRouter(state),  
}))
export default class Navigator extends Component {

    static configureScene(route) {
        // use default as PushFromRight, do not use HorizontalSwipeJump or it can lead to swipe horizontal unwanted
        return NavigatorRN.SceneConfigs[route.animationType || 'PushFromRight']
    }

    // replace view from stack
    componentWillReceiveProps({router}){        
      this.refs.navigator.replace(routes[router.route])      
    }

    renderScene = (route, navigator) => {           
        return this.props.renderScene(route, navigator)
    }

    render() {
      const {initialRoute} = this.props
        return (            
            <NavigatorRN ref="navigator"
                configureScene={Navigator.configureScene}
                initialRoute={initialRoute}
                renderScene={this.renderScene}                
            />
            
        )
    }
}

