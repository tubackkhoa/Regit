import React, { Component } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { 
  Container, Content, Button, Icon, List, 
  ListItem, InputGroup, Input, Picker, Text, Thumbnail,
  Form, Item, Switch, View,
} from 'native-base'
import styles from './styles'

import * as dataActions from '~/store/actions/data'
import * as commonActions from '~/store/actions/common'
import * as accountSelectors from '~/store/selectors/account'
import * as dataSelectors from '~/store/selectors/data'

import DatePicker from '~/ui/components/DatePicker'
import Header from '~/ui/components/Header'
import Toggle from '~/ui/components/Toggle'

import { API_BASE } from '~/store/constants/api'
import { Field, reduxForm } from 'redux-form'

import { 
  InputField,
  DateField, 
  DropdownField,
} from '~/ui/elements/Form'

import { validate } from './utils'
import { profileCover } from '~/assets'

@connect(state=>({  
  initialValues: accountSelectors.getProfile(state),
  countries: dataSelectors.getCountries(state),
  cities: dataSelectors.getCities(state),
}), {...commonActions, ...dataActions})
@reduxForm({ form: 'ProfileForm', validate})
export default class UserProfile extends Component {  

  componentDidMount(){
    const {countries, getCountries, initialValues:profile} = this.props
    countries.length 
      ? this.loadCities(countries, profile.Country) 
      : getCountries(data=>this.loadCities(data. profile.Country))
  }

  loadCities(countries, value){    
    const countryCode = countries.find(item=> item.Name === value)['Code']
    this.props.getCities(countryCode)    
  }

  makeItems(data){
    const ret = {}
    // pure key value
    data && data.forEach(item=>ret[item.Name] = item.Name)
    return ret
  }

  _onChangeCountries = (value)=>{    
    console.log(value)
    this.loadCities(this.props.countries, value)
  }

  render() {        
    const {initialValues:profile, route, goBack, countries, cities} = this.props
    const avatar = {uri: (API_BASE + profile.PhotoUrl)}      
    return (
      <Container>
        
        <Image style={styles.headerImage} source={profileCover}/>        
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
            <Field name="Country" onSelected={this._onChangeCountries} component={DropdownField} 
              header="Select Country" items={this.makeItems(countries)} />            
            <Field name="City" component={DropdownField} 
              header="Select City" items={this.makeItems(cities)}/>
          </Form>
                    
        </Content>

      </Container>
    )
  }
}
