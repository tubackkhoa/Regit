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

    // will jump to when call the function forwardTo
    componentWillReceiveProps({router}){        
      const mavigateMethod = this.refs.navigator[router.method]
      mavigateMethod && mavigateMethod(routes[router.route])
    }

    shouldComponentUpdate({router}){
        return (this.props.router.route !== router.route)
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

