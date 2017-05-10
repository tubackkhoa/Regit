import React, { Component } from 'react'
import {             
    Button, List, ListItem, Switch,
    Container, Text, Item, Input, Left, Body, Right, View,
} from 'native-base'

import Icon from '~/ui/elements/Icon'
import Toggle from '~/ui/components/Toggle'

import moment from 'moment'

import styles from '../shared/styles'


export default class extends Component {

  renderItem({
    description, businessName, membershipProgramName, holder, membershipNumber,
     membershipClass, loginId, loginSite,
     expiryDate, note, noteOnline, privacy, _default}, index, last=false){    
    return (
      <ListItem style={{...styles.itemBody, height: null}} key={index} last={last}>                                                
        
        <View>
          <Text>
            {description &&
              <Text small><Text small bold>Description:</Text> {description}{"\n"}</Text>
            }
            {businessName &&
              <Text small><Text small bold>Business name:</Text> {businessName}{"\n"}</Text>
            }
            {membershipProgramName &&
              <Text small><Text small bold>Program name:</Text> {membershipProgramName}{"\n"}</Text>
            }
            {holder &&
              <Text small><Text small bold>Holder:</Text> {holder}{"\n"}</Text>
            }
            {membershipNumber &&
              <Text small><Text small bold>Membership number:</Text> {membershipNumber}{"\n"}</Text>
            }
            {membershipClass &&
              <Text small><Text small bold>Membership class:</Text> {membershipClass}{"\n"}</Text>
            }             
            {expiryDate &&
              <Text small><Text small bold>Expiry date:</Text> {expiryDate ? moment(expiryDate).format('dddd, MMMM D, YYYY') : 'Indefinite'}{"\n"}</Text>
            }
            {loginId &&
              <Text small><Text small bold>Login Id:</Text> {loginId}{"\n"}</Text>
            }
            {loginSite &&
              <Text small><Text small bold>Login site:</Text> {loginSite}{"\n"}</Text>
            }
            {(note||noteOnline) &&
              <Text small><Text small bold>Note:</Text> {note||noteOnline}{"\n"}</Text>
            }           
          </Text>                              
        </View>        
        
        <View style={styles.viewRight}>
          <Toggle style={{...styles.toggleSmall, alignSelf:'flex-end',marginTop:-5}} iconStyle={styles.iconSmall} titleStyle={styles.label} 
            trueText={''} falseText={''} checked={!privacy} />
          {_default &&
          <Button transparent bordered textSmall style={{...styles.buttonSmall, right:20}}>
            <Text active>DEFAULT</Text>
          </Button>
          } 
        </View>
        
      </ListItem> 
    ) 
  }

  renderMembership({label, value}){
    // do not return 0, other wise must be wrapped in Text
    return (!!value.length &&
      <View regit style={{
        marginTop: 10,
        marginBottom: 10,        
      }}>

        <ListItem style={styles.itemHeaderLarge}>
            <Button style={styles.itemHeaderButton} transparent>
              <Icon style={styles.iconPush} name="cloud-upload" />
            </Button>
            <Text style={{textAlign:'center'}}>{label}</Text>
            <Button style={styles.itemHeaderButton} transparent>
              <Icon style={styles.iconGray} name="edit" />
            </Button>
        </ListItem>                    
        
        {value.map((item, index)=>
          this.renderItem(item, index, index === value.length - 1)
        )}   
               
      </View>  
    )
  }

  render(){
    const {vaultInfo} = this.props
    return (
      <View>
      {this.renderMembership(vaultInfo)}      
      </View>      
    )
  }
}