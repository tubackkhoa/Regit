import React, { Component } from 'react'
import {                 
    Button, Container, Text, Label,
    ListItem, Item, View, Input, CheckBox, Left,
} from 'native-base'

import Footer from '~/ui/components/Footer'
import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import Header from '~/ui/components/Header'

import { Field, reduxForm, formValueSelector } from 'redux-form'

import { 
  InputField,
  CheckBoxField,
  DateField,
} from '~/ui/elements/Form'
import { validate } from './utils'

import Icon from '~/ui/elements/Icon'

import options from './options'
import styles from './styles'

const formSelector = formValueSelector('DelegationForm')


@connect(state=>({  
  initialValues: {
    interaction: true,     
    effectDate: '12/24/2016',
    endDate: '04/12/2017'   
  },
  roles: formSelector(state, ...options.roles.map(c=>c.name)),
  dateIndefinite: formSelector(state, ...options.dateIndefinite.map(c=>c.name))
}), {...commonActions})
@reduxForm({ form: 'DelegationForm', validate})
export default class extends Component {


  render() {
    const {route, goBack, roles, dateIndefinite} = this.props    
    return (          
       
        <Container>
        
            <Header hasTabs
              left={
                <Button transparent onPress={e=>goBack()}>
                  <Icon name="keyboard-arrow-left"/>
                </Button>
              }
              center={`${route.title} : ${route.params.id}`}                         
            />  


            <Content padder>       

              <Field label="Type a name" name="name" component={InputField} />

              <View padder style={styles.mt5} row>
                <Text>Set a role</Text>
                <Icon style={styles.iconLabel} name="question" />
              </View>

              <View regit>                  

                {options.roles.map((item, index) =>
                <ListItem style={styles.listItemFull} key={index} active={roles[item.name]}>                                                                                                 
                  <Field label={item.title} large name={item.name} component={CheckBoxField}/>                    
                </ListItem>
                )}
                {options.items.map((item, index) =>
                  <ListItem key={index} last={index===options.items.length-1} style={styles.listItem}>                                                
                    <Text style={styles.left}>{item.title}</Text>             
                    <View style={styles.right}>
                      <Field label="Read" name="interaction" component={CheckBoxField}/>
                      <Field label="Write" name="write" component={CheckBoxField}/>
                    </View>                      
                  </ListItem>
                )}                     
              </View>

              <View regit style={styles.mt15} full row>
                <Text style={styles.dateLabel}>Effective date</Text>
                <Field 
                  inputStyle={styles.dateInput}
                  iconStyle={styles.dateIcon}
                  style={styles.dateContainer} name="effectDate" 
                  displayFormat="DD MMM YYYY" component={DateField} icon="keyboard-arrow-down" />
              </View>


              <View regit style={styles.mt15}>
                {options.dateIndefinite.map((item, index) =>
                  <ListItem style={styles.listItemFull} key={index} active={dateIndefinite[item.name]}>                                                                                                 
                    <Field label={item.title} large name={item.name} component={CheckBoxField}/>                    
                  </ListItem>
                )}
                
                <View full row>
                  <Text style={styles.dateLabel}>End date</Text>
                  <Field 
                  inputStyle={styles.dateInput}
                  iconStyle={styles.dateIcon}
                  style={styles.dateContainer} name="endDate" displayFormat="DD MMM YYYY" component={DateField} icon="keyboard-arrow-down" />
                </View>
              </View>


              <Field label="Type a message" name="message" inputStyle={styles.textarea} style={styles.textareaContainer}
               multiline component={InputField} />    

              <View padder>
                <Field label={
                  <Text style={styles.label}>I understand the risk of delegation and agree to the 
                    <Text style={styles.label} active> Terms & Conditions</Text>
                  </Text>
                } large name="agree" component={CheckBoxField}/>    
              </View>

              <Button style={styles.button} block><Text>Invite</Text></Button>  


            </Content>

            
            
        </Container>
      
    )
  }
}