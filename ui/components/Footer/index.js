import React, { Component } from 'react'

import {         
    Footer, 
    FooterTab, 
    Button,         
    Text,
    Badge,
    View,
} from 'native-base'

import Icon from '~/ui/elements/Icon'
import options from './options'
import styles from './styles'

import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import { getRouter } from '~/store/selectors/common'

@connect(state=>({
  router: getRouter(state),  
}), {...commonActions})
export default class extends Component {
  render() {
      const {forwardTo, router} = this.props
      return (                             
        
        <Footer>
            <FooterTab style={styles.container}>
              {options.footerItems.map((item, index)=>
                <Button onPress={e=>forwardTo(item.route)} textSmall key={index}>                        
                    <Icon name={item.icon} style={
                      item.route === router.route  ? styles.footerIconActive : styles.footerIcon
                    } />
                    <Text style={index === 2 ? styles.active : {}}>{item.name}</Text>
                </Button>
              )}                
              <Button onPress={e=>forwardTo('notification')} badge textSmall>                  
                  <Badge style={styles.badgeText}><Text>5</Text></Badge>      
                  <Icon name="notification" style={
                    {...(router.route === 'notification' ? styles.footerIconActive : styles.footerIcon), ...styles.badgeIcon}
                  }/>
                  <Text>Notification</Text>
              </Button>
            </FooterTab>
        </Footer>    
        
      )
  }
}