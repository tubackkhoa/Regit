import React, { Component } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { 
  Container, Content, Button, Icon, List, 
  ListItem, InputGroup, Input, Picker, Text, Thumbnail,
  Form, Item, Switch, View,
} from 'native-base'
import styles from './styles'
import * as accountSelectors from '~/store/selectors/account'
import { goBack, setToast } from '~/store/actions/common'
import DatePicker from '~/ui/components/DatePicker'
import Header from '~/ui/components/Header'
import Toggle from '~/ui/components/Toggle'

import {  
  API_BASE
} from '~/store/constants/api'

import { Field, reduxForm } from 'redux-form'

import { 
  InputField,
  DateField, 
} from '~/ui/elements/Form'

import { showToast } from '~/store/actions/common'

const profileCoverImage = require('~/assets/profile-cover.png')

const validate = (values) => {
  const errors = {}
  if(!values) return errors
  return errors
}

@connect(state=>({  
  initialValues: accountSelectors.getProfile(state),
}), { setToast, goBack })
@reduxForm({ form: 'ProfileForm', validate})
export default class UserProfile extends Component {  

  render() {    
    const {initialValues:profile, route} = this.props
    const avatar = {uri: (API_BASE + profile.PhotoUrl)}    
    return (
      <Container>
        
        <Image style={styles.headerImage} source={profileCoverImage}/>        
        <View padder style={styles.headerContainer}>
          <Icon name="cancel" style={styles.headerIcon} onPress={()=>this.props.goBack()} />  
          <View style={styles.avatarContainer}>      
            <Thumbnail source={avatar} style={styles.avatar}/>
            <View style={styles.photoIconContainer}>
            <Icon name="photo-camera" style={styles.photoIcon}/>
            </View>
          </View>          
          <Icon name="edit" style={styles.headerIcon}/>
        </View>

        <Content padder>                    
          <Form>            
            <Text style={styles.label}>DisplayName</Text>
            <Field name="DisplayName" component={InputField} />
            <Toggle titleStyle={styles.label} title="Day of birth" text="Public" />            
            <Field name="Birthdate" displayFormat="DD MMMM YYYY" component={DateField} icon="keyboard-arrow-down" />
            <Toggle titleStyle={styles.label} title="Location" text="Public" />            
            <Field name="Country" component={InputField} icon="keyboard-arrow-down" />
            <Field name="City" component={InputField} icon="keyboard-arrow-down" />
          </Form>
          
        </Content>
      </Container>
    )
  }
}
