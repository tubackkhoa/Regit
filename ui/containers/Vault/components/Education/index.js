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
    description, schoolName, major, minor, schoolId, expiryDate,
    certificationType, grade, certificateNumber, graduatedDate,
    note, privacy, _default}, index, last=false){    
    return (
      <ListItem style={{...styles.itemBody, height: null}} key={index} last={last}>                                                
        
        <View>          
          <Text>
            {description &&
              <Text small><Text small bold>Description:</Text> {description}{"\n"}</Text>
            }
            {schoolName &&
              <Text small><Text small bold>School name:</Text> {schoolName}{"\n"}</Text>
            }
            {major &&
              <Text small><Text small bold>Major:</Text> {major}{"\n"}</Text>
            }
            {minor &&
              <Text small><Text small bold>Minor:</Text> {minor}{"\n"}</Text>
            }
            {schoolId &&
              <Text small><Text small bold>School Id:</Text> {schoolId}{"\n"}</Text>
            }           
            {expiryDate &&
              <Text small><Text small bold>Exipry date:</Text> {moment(expiryDate).format('dddd, MMMM D, YYYY')}{"\n"}</Text>
            }
            {certificationType &&
              <Text small><Text small bold>Certification type:</Text> {certificationType}{"\n"}</Text>
            }
            {grade &&
              <Text small><Text small bold>Grade:</Text> {grade}{"\n"}</Text>
            }     
            {certificateNumber &&
              <Text small><Text small bold>Certification number:</Text> {certificateNumber}{"\n"}</Text>
            }  
            {graduatedDate &&
              <Text small><Text small bold>Graduated date:</Text> {moment(graduatedDate).format('dddd, MMMM D, YYYY')}{"\n"}</Text>
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

  renderEducation({label, value}){
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
      {this.renderEducation(vaultInfo)}      
      </View>      
    )
  }
}