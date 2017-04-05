import React, { Component, PropTypes } from 'react'

import {      
  StyleProvider, 
  Drawer,
  Container as ContainerNB,
} from 'native-base'

import SideBar from '~/ui/components/SideBar'
import { connect } from 'react-redux'
import { closeDrawer } from '~/store/actions/common'
import { getDrawerState } from '~/store/selectors/common'

import getTheme from '~/theme/components'
import material from '~/theme/variables/material'

@connect(state=>({
  drawerState: getDrawerState(state),
}), {closeDrawer})
export default class Container extends Component {

  static propTypes = {
    children: PropTypes.node,
    navigator: PropTypes.object.isRequired,
  }

  render() {    
    const {showDrawer, drawerState} = this.props
    return ( 
      <StyleProvider style={getTheme(material)}>       
      {showDrawer
        ? <Drawer
            open={drawerState === 'opened'}
            type="static"             
            content={showDrawer && <SideBar navigator={this.props.navigator} />}
            onClose={this.props.closeDrawer}
          >          
            {this.props.children}          
          </Drawer>   
        : <ContainerNB>{this.props.children}</ContainerNB>
      }
      </StyleProvider>     
    )
  }
}

