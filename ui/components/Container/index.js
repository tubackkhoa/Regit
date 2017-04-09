import React, { Component, PropTypes } from 'react'

import {      
  StyleProvider, 
  Drawer,
  Container,
} from 'native-base'

import SideBar from '~/ui/components/SideBar'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import { getDrawerState } from '~/store/selectors/common'

import getTheme from '~/theme/components'
import material from '~/theme/variables/material'

@connect(state=>({
  drawerState: getDrawerState(state),
}), {...commonActions})
export default class extends Component {

  static propTypes = {
    children: PropTypes.node,
    navigator: PropTypes.object.isRequired,
  }

  render() {    
    // should write out function, to prevent wrong params given, and to make sure it is function
    const {showDrawer, drawerState, closeDrawer, navigator, children} = this.props
    return ( 
      <StyleProvider style={getTheme(material)}>       
      {showDrawer
        ? <Drawer
            open={drawerState === 'opened'}
            type="displace"             
            content={showDrawer && <SideBar navigator={navigator} />}
            onClose={()=>closeDrawer()}
          >          
            {children}          
          </Drawer>   
        : <Container>{children}</Container>
      }
      </StyleProvider>     
    )
  }
}

