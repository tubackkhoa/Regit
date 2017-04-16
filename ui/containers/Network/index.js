import React, { Component } from 'react'
import {                 
    Button, Container, ListItem, TabHeading, Thumbnail, DefaultTabBar,
    Text, Item, View, Input, Left, Body, Tab, Right,
} from 'native-base'


// import { connect } from 'react-redux'
// import * as commonActions from '~/store/actions/common'
// import * as accountSelectors from '~/store/selectors/account'
// import Header from '~/ui/components/Header'

import Tabs from '~/ui/components/Tabs'
import PendingTab from './components/PendingTab'
import NormalTab from './components/NormalTab'
import TrustedTab from './components/TrustedTab'
import BusinessTab from './components/BusinessTab'
import styles from './styles'

// import { API_BASE } from '~/store/constants/api'

// @connect(state=>({
//   profile: accountSelectors.getProfile(state),
// }), {...commonActions})
export default class extends Component {  

  render() {

    const {app} = this.props        
    return (          
       
        <Container>         

            <Tabs>
                <Tab style={styles.container} heading="PENDING">
                  <PendingTab/>
                </Tab>
                <Tab style={styles.container} heading="NORMAL">
                  <NormalTab app={app}/>
                </Tab>
                <Tab style={styles.container} heading="TRUSTED">
                  <TrustedTab app={app}/>
                </Tab>
                <Tab style={styles.container} heading="BUSINESS">
                  <BusinessTab app={app}/>
                </Tab>
            </Tabs>   
            
        </Container>
      
    )
  }
}