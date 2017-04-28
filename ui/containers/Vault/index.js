import React, { Component } from 'react'
import {             
    Button, List, ListItem, Switch,
    Container, Text, Item, Input, Left, Body, Right, View,
} from 'native-base'

import Icon from '~/ui/elements/Icon'
import IconMessage from '~/ui/elements/IconMessage'
import Content from '~/ui/components/Content'
import Header from './components/Header'
import BasicInformation from './components/BasicInformation'
import SearchResultItem from './components/SearchResultItem'
import AddButton from '~/ui/elements/AddButton'
import { connect } from 'react-redux'

import * as commonSelectors from '~/store/selectors/common'
import * as authSelectors from '~/store/selectors/auth'
import * as accountSelectors from '~/store/selectors/account'
import * as vaultSelectors from '~/store/selectors/vault'

import * as commonActions from '~/store/actions/common'
import * as vaultActions from '~/store/actions/vault'
import { API_BASE } from '~/store/constants/api'

import {
  contactIcon,
  addressIcon,
  financeIcon,
  governmentIcon,
  documentIcon,
  membershipIcon,
  relationshipIcon,
  employmentIcon,
  educationIcon,
  otherIcon,
} from '~/assets'

import styles from './styles'

@connect(state=>({  
  token: authSelectors.getToken(state),
  vault: vaultSelectors.getVaultInformation(state),
  profile: accountSelectors.getProfile(state),
  searchString: commonSelectors.getSearchString(state),
}), {...commonActions, ...vaultActions})
export default class extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      selected: 0,
    }
    const avatar = {uri: (API_BASE + props.profile.PhotoUrl)}
    this.options = [
      {key: 'basicInformation', icon: avatar, title: 'Basic', type: 'avatar'}, 
      {key: 'contact', icon: contactIcon, title: 'Contact'},
      {key: 'groupAddress', icon: addressIcon, title: 'Address'},
      {key: 'groupFinancial', icon: financeIcon, title: 'Financial'},
      {key: 'groupGovernmentID', icon: governmentIcon, title: 'Government ID'}, 
      {key: 'document', icon: documentIcon, title: 'Document'},
      {key: 'membership', icon: membershipIcon, title: 'Membership'},
      {key: 'family', icon: relationshipIcon, title: 'Relationship'},
      {key: 'employment', icon: employmentIcon, title: 'Employment'},
      {key: 'education', icon: educationIcon, title: 'Education'},
      {key: 'others', icon: otherIcon, title: 'Others'},
    ]
  }

  componentDidMount(){
    const {token, vault, getVaultInformation} = this.props
    // later we have the network
    if(!vault.VaultInformation){
      getVaultInformation(token)
    }    
  }

  componentWillReceiveProps({searchString}){
    if(searchString !== this.props.searchString){
      // console.log('do search', searchString)
    }
  }

  _optionSelect = (selected) => {
    this.setState({selected})
  }

  renderSearchResult(){
    return (
      <View>
        <SearchResultItem data={{
          title: 'Home phone',
          type: 'phone',
          values: [
            '123',
            '123',
            '123',
          ]
        }}/>   
        <SearchResultItem data={{
          title: 'Current Address',
          type: 'address',
          values: [
            '123'
          ]
        }}/>   
      </View>
    )
  }

  renderVaultInformation(key){
    const vaultInfo = this.props.vault.VaultInformation[key]
    switch(key){
      default:
        return <BasicInformation vaultInfo={vaultInfo} />
    }
  }

  renderVault(){    
    const {selected} = this.state
    const selectedOption = this.options[selected]    
    const vaultInfo = this.props.vault.VaultInformation[selectedOption.key]
    return ( 
      <View>        
        <Header options={this.options} selected={selected} onOptionSelect={this._optionSelect}/>
        <Text style={styles.optionTitle}>{vaultInfo.label || selectedOption.title}</Text>
        {this.renderVaultInformation(selectedOption.key)}
      </View>
    )
  }

  render() {
    const {searchString} = this.props
    console.log('search',searchString)    
    return (                 
        <Container>                    
            <Content padder>                            
              {searchString ? this.renderSearchResult() : this.renderVault()}                                       
            </Content>                 
            <AddButton/>  
        </Container>      
    )
  }
}