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

// component should not update on store that connect to database
@connect(null, {...commonActions})
export default class extends Component {
  render() {
      return (                             
        
        <Footer>
            <FooterTab style={styles.container}>
              {options.footerItems.map((item, index)=>
                <Button onPress={e=>this.props.forwardTo(item.route)} textSmall key={index}>                        
                    <Icon name={item.icon} style={
                      index === 2 
                      ? {...styles.footerIcon, ...styles.active}
                      : styles.footerIcon
                      } />
                    <Text style={index === 2 ? styles.active : {}}>{item.name}</Text>
                </Button>
              )}                
              <Button badge textSmall>                  
                  <Badge style={styles.badgeText}><Text>5</Text></Badge>      
                  <Icon name="notification" style={{...styles.footerIcon, ...styles.badgeIcon}}/>
                  <Text>Notification</Text>
              </Button>
            </FooterTab>
        </Footer>    
        
      )
  }
}