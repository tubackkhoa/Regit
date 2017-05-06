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
    description, addressLine, bankName, bankBranch, accountNumber, cardNumber, accountType,
    country, city, issuedDate, expiryDate, nonExpiry, note, privacy, _default}, index, last=false){    
    return (
      <ListItem style={{...styles.itemBody, height: null}} key={index} last={last}>                                                
        
        <View>
          {_default &&
          <Button transparent bordered textSmall style={{...styles.buttonSmall, marginLeft:0}}>
            <Text active>DEFAULT</Text>
          </Button>
          } 
          <Text>
            {description &&
              <Text small><Text small bold>Description:</Text> {description}{"\n"}</Text>
            }
            {bankName &&
              <Text small><Text small bold>Bank name:</Text> {bankName}{"\n"}</Text>
            }
            {bankBranch &&
              <Text small><Text small bold>Bank branch:</Text> {bankBranch}{"\n"}</Text>
            }
            {accountNumber &&
              <Text small><Text small bold>Account number:</Text> {accountNumber}{"\n"}</Text>
            }
            {accountType &&
              <Text small><Text small bold>Account type:</Text> {accountType}{"\n"}</Text>
            }
            {cardNumber &&
              <Text small><Text small bold>Card number:</Text> {cardNumber}{"\n"}</Text>
            }
            {country &&
              <Text small><Text small bold>Country:</Text> {country}{"\n"}</Text>
            }
            {city &&
              <Text small><Text small bold>City:</Text> {city}{"\n"}</Text>
            }
            {issuedDate &&
              <Text small><Text small bold>Issued date:</Text> {moment(issuedDate).format('dddd, MMMM D, YYYY')}{"\n"}</Text>
            }
            {expiryDate &&
              <Text small><Text small bold>Expiry date:</Text> {expiryDate ? moment(expiryDate).format('dddd, MMMM D, YYYY') : 'Indefinite'}{"\n"}</Text>
            }
            {nonExpiry &&
              <Text small><Text small bold>Non expiry:</Text> {nonExpiry.toString()}{"\n"}</Text>
            }  
            {note &&
              <Text small><Text small bold>Note:</Text> {note}{"\n"}</Text>
            }           
          </Text>                              
        </View>        
        
        <Toggle style={{...styles.toggleSmall, alignSelf:'flex-start',marginTop:-5}} iconStyle={styles.iconSmall} titleStyle={styles.label} 
            trueText={''} falseText={''} checked={!privacy} />
        
      </ListItem> 
    ) 
  }

  renderFinancial({label, value}){
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
    const {
      bankCard, bankAccount,
      investment, insurance,
    } = vaultInfo.value
    return (
      <View>
      {this.renderFinancial(bankCard)}
      {this.renderFinancial(bankAccount)}
      {this.renderFinancial(investment)}
      {this.renderFinancial(insurance)}
      </View>
      
    )
  }
}