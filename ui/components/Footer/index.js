import React, { Component } from 'react'

import {         
    Footer as FooterNB, 
    FooterTab, 
    Button,     
    Icon, 
    Text,
    Badge,
} from 'native-base'


export default class Footer extends Component {
  render() {
      return (                             

        <FooterNB>
            <FooterTab>
                <Button textSmall>                        
                    <Icon name="home" />
                    <Text>Home Feeds</Text>
                </Button>
                <Button textSmall>                        
                    <Icon name="supervisor-account" />
                    <Text>Delegation</Text>
                </Button>
                <Button textSmall>                        
                    <Icon name="home" />
                    <Text>Vault</Text>
                </Button>
                <Button textSmall>                        
                    <Icon name="message" />
                    <Text>Message</Text>
                </Button>
                <Button badge textSmall>                  
                    <Badge><Text>3</Text></Badge>      
                    <Icon name="notifications" />
                    <Text>Notification</Text>
                </Button>
            </FooterTab>
        </FooterNB>        
      )
  }
}