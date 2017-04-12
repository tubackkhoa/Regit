import React, { Component } from 'react'
import {                 
    Button, Icon, Form, 
    Container, Text, Item, View, Input,
} from 'native-base'

import Footer from '~/ui/components/Footer'
import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import Header from '~/ui/components/Header'

import { Field, reduxForm } from 'redux-form'

import { 
  InputField,
} from '~/ui/elements/Form'

import { validate } from './utils'
import styles from '../shared/styles'

// import styles from './styles'
@connect(state=>({  
  initialValues: {},
}), {...commonActions })
@reduxForm({ form: 'ChangePasswordForm', validate})
export default class extends Component {

  render() {
    const {goBack, route} = this.props
    return (          
       
        <Container>
        
            <Header 
              left={
                <Button transparent onPress={e=>goBack()}>
                  <Icon name="keyboard-arrow-left"/>
                </Button>
              }
              center={route.title}                         
            />  

            <Content padder>       
              <Form style={styles.form}>        
                <Text note bold style={styles.label}>CHANGE LOGIN PASSWORD</Text>
                <Field secureTextEntry={true} placeholder="Old password" name="DisplayName" component={InputField} />
                <Field style={styles.inputFirst} secureTextEntry={true} placeholder="New password" name="DisplayName" component={InputField} />
                <Field style={styles.inputLast} secureTextEntry={true} placeholder="Re-enter new password" name="DisplayName" component={InputField} />

                <View style={styles.buttonContainer}>
                  <Button block style={styles.cancelButton}>
                      <Text>Cancel</Text>
                  </Button>
                  <Button block style={styles.okButton}>
                      <Text>Change</Text>
                  </Button>
                </View>
              </Form>
            </Content>

            <Footer />
            
        </Container>
      
    )
  }
}