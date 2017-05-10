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
    description, firstName, middleName, lastName, certificateNumber,
     cardType, cardNumber, bloodType, nationality,
      issuedDate, expiryDate, issuedBy, issuedIn, country, city, note, privacy, _default}, index, last=false){    
    return (
      <ListItem style={{...styles.itemBody, height: null}} key={index} last={last}>                                                
        
        <View>
          <Text>
            {description &&
              <Text small><Text small bold>Description:</Text> {description}{"\n"}</Text>
            }
            {firstName &&
              <Text small><Text small bold>First name:</Text> {firstName}{"\n"}</Text>
            }
            {middleName &&
              <Text small><Text small bold>Middle name:</Text> {middleName}{"\n"}</Text>
            }
            {lastName &&
              <Text small><Text small bold>Last name:</Text> {lastName}{"\n"}</Text>
            }
            {nationality &&
              <Text small><Text small bold>Nationality/ Citizenship:</Text> {nationality}{"\n"}</Text>
            }
            {certificateNumber &&
              <Text small><Text small bold>Certificate number:</Text> {certificateNumber}{"\n"}</Text>
            }
            {cardType &&
              <Text small><Text small bold>Card type:</Text> {cardType}{"\n"}</Text>
            }  
            {cardNumber &&
              <Text small><Text small bold>Card number:</Text> {cardNumber}{"\n"}</Text>
            }    
            {bloodType &&
              <Text small><Text small bold>Blood Type:</Text> {bloodType}{"\n"}</Text>
            }                     
            {issuedDate &&
              <Text small><Text small bold>Issued date:</Text> {moment(issuedDate).format('dddd, MMMM D, YYYY')}{"\n"}</Text>
            }
            {expiryDate &&
              <Text small><Text small bold>Expiry date:</Text> {expiryDate ? moment(expiryDate).format('dddd, MMMM D, YYYY') : 'Indefinite'}{"\n"}</Text>
            }
            {issuedBy &&
              <Text small><Text small bold>Issued by:</Text> {issuedBy}{"\n"}</Text>
            }
            {issuedIn &&
              <Text small><Text small bold>Issued in:</Text> {issuedIn}{"\n"}</Text>
            }
            {country &&
              <Text small><Text small bold>Country:</Text> {country}{"\n"}</Text>
            }
            {city &&
              <Text small><Text small bold>City:</Text> {city}{"\n"}</Text>
            }
            {note &&
              <Text small><Text small bold>Note:</Text> {note}{"\n"}</Text>
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

  renderGovernmentID({label, value}){
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
      birthCertificate, driverLicenseCard,
      healthCard, medicalBenefitCard,
      passportID, taxID, CustomGovernmentID,
    } = vaultInfo.value
    return (
      <View>
      {this.renderGovernmentID(birthCertificate)}
      {this.renderGovernmentID(driverLicenseCard)}
      {this.renderGovernmentID(healthCard)}
      {this.renderGovernmentID(medicalBenefitCard)}
      {this.renderGovernmentID(passportID)}
      {this.renderGovernmentID(taxID)}
      {this.renderGovernmentID(CustomGovernmentID)}
      </View>
      
    )
  }
}