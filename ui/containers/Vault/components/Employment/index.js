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
    description, companyName, title, email, phoneNumber, phoneCountry,
    salary, employmentStatus, startDate, endDate, country, city,
    note, privacy, _default}, index, last=false){    
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
            {companyName &&
              <Text small><Text small bold>Company name:</Text> {companyName}{"\n"}</Text>
            }
            {title &&
              <Text small><Text small bold>Title:</Text> {title}{"\n"}</Text>
            }
            {email &&
              <Text small><Text small bold>Email:</Text> {email}{"\n"}</Text>
            }
            {phoneNumber &&
              <Text small><Text small bold>Phone number:</Text> {phoneCountry}{phoneNumber}{"\n"}</Text>
            }
            {salary &&
              <Text small><Text small bold>Salary:</Text> {salary}{"\n"}</Text>
            }                     
            {employmentStatus &&
              <Text small><Text small bold>Employment status:</Text> {employmentStatus}{"\n"}</Text>
            }    
            {startDate &&
              <Text small><Text small bold>Start date:</Text> {moment(startDate).format('dddd, MMMM D, YYYY')}{"\n"}</Text>
            }
            {endDate &&
              <Text small><Text small bold>End date:</Text> {moment(endDate).format('dddd, MMMM D, YYYY')}{"\n"}</Text>
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
        
        <Toggle style={{...styles.toggleSmall, alignSelf:'flex-start',marginTop:-5}} iconStyle={styles.iconSmall} titleStyle={styles.label} 
            trueText={''} falseText={''} checked={!privacy} />
        
      </ListItem> 
    ) 
  }

  renderEmployment({label, value}){
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
      {this.renderEmployment(vaultInfo)}      
      </View>      
    )
  }
}