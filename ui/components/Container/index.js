import { StyleSheet } from 'react-native'
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

import getTheme from '~/native-base-theme/components'
import material from '~/native-base-theme/variables/material'

@connect(state=>({
  drawerState: getDrawerState(state),
}), {closeDrawer})
export default class Container extends Component {

  static propTypes = {
    children: PropTypes.node,
    navigator: PropTypes.object.isRequired,
  }

  updateDrawer(){    
    const {showDrawer} = this.props
    if(!showDrawer)
      return false
    if (this.props.drawerState === 'opened') {
      this.refs.drawer._root.open()
    } else if (this.props.drawerState === 'closed') {
      this.refs.drawer._root.close()
    }
  }

  // from hydrat
  componentDidMount(){
    this.updateDrawer()
  }

  // from update store
  componentDidUpdate() {
    this.updateDrawer()
  }

  render() {    
    const {showDrawer} = this.props
    return ( 
      <StyleProvider style={getTheme(material)}>       
      {showDrawer
        ? <Drawer
            ref="drawer"
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

