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
import * as commonActions from '~/store/actions/common'
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
  DropdownField,
} from '~/ui/elements/Form'


const profileCoverImage = require('~/assets/profile-cover.png')

const validate = (values) => {
  const errors = {}
  if(!values) return errors
  return errors
}

@connect(state=>({  
  initialValues: accountSelectors.getProfile(state),
}), {...commonActions})
@reduxForm({ form: 'ProfileForm', validate})
export default class UserProfile extends Component {  

  constructor(props) {
        super(props);
        this.state = {
            selectedItem: undefined,
            selected1: 'key1',
            results: {
                items: []
            }
        }
    }
    onValueChange (value: string) {
        console.log(this.refs.picker.children)
        this.setState({
            selected1 : value
        });
    }

  _onChangeCity = (e)=>{
    this.props.setToast('hehe')
  }

  render() {        
    const {initialValues:profile, route, goBack} = this.props
    const avatar = {uri: (API_BASE + profile.PhotoUrl)}    
    return (
      <Container>
        
        <Image style={styles.headerImage} source={profileCoverImage}/>        
        <View padder style={styles.headerContainer}>
          <Icon name="cancel" style={styles.headerIcon} onPress={()=>goBack()} />  
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
            <Field name="Country" component={DropdownField} header="Select Country" items={{China:'China',Aihua:'Aihua'}} />            
            <Field disabled onPress={this._onChangeCity} name="City" component={InputField} icon="keyboard-arrow-down" />
          </Form>
                    
        </Content>
        
      </Container>
    )
  }
}
