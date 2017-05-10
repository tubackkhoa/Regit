import React, { Component } from 'react'
import { Image } from 'react-native'
import {             
    Button, List, ListItem, Switch, Spinner,
    Container, Text, Item, Input, Left, Body, Right, View,
} from 'native-base'

import Icon from '~/ui/elements/Icon'
import IconMessage from '~/ui/elements/IconMessage'
import Content from '~/ui/components/Content'
import Header from './components/Header'
import BasicInformation from './components/BasicInformation'
import Contact from './components/Contact'
import Address from './components/Address'
import Financial from './components/Financial'
import GovernmentID from './components/GovernmentID'
import Membership from './components/Membership'
import Relationship from './components/Relationship'
import Employment from './components/Employment'
import Document from './components/Document'
import Education from './components/Education'
import Others from './components/Others'
import SearchResultItem from './components/SearchResultItem'
import AddButton from '~/ui/elements/AddButton'
import { connect } from 'react-redux'

import _ from 'lodash'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { getPopoverOptions } from './utils'
import material from '~/theme/variables/material'

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

const copiedMessage = (
  <IconMessage size={30} message="Copied   " />
)

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
      refreshing: false,
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

    const chunks = _.chunk(this.options.slice(2), 3)    

    this.popMenu = (
      <Grid>
        {chunks.map((row, rowIndex)=>
        <Row key={rowIndex}>
        {row.map(({key, icon, title, type}, index)=>
          <Col key={key}>
            <Button onPress={e=>this.handleOption(index)} noPadder transparent style={styles.optionButton}>
              <Image source={icon} style={styles.optionImage} />                          
            </Button>
            <Text style={styles.optionText}>{title}</Text>
          </Col>
        )}
        </Row>
        )}
      </Grid>
    )
  }

  handleOption(index){
    this.props.app.popover.show(false)
    this.props.forwardTo('vault/add')
  }

  _onCopy = (e)=>{
    this.props.setToast(copiedMessage, 'info', 500, 'center')
  }

  componentWillMount(){
    this.componentWillFocus()
  }

  componentWillFocus(){    
    const {token, vault, getVaultInformation} = this.props
    // later we have the network
    if(!vault.VaultInformation){
      getVaultInformation(token)
    } 
      
    this.setState({
      refreshing: false,
    })
    
  }

  componentWillReceiveProps({searchString}){
    if(searchString !== this.props.searchString){
      // console.log('do search', searchString)
    }
  }

  _onRefresh =() => {
    this.setState({refreshing: true})                
    this.props.getVaultInformation(this.props.token, ()=>this.setState({refreshing: false}))   
  }   

  _optionSelect = (selected) => {
    this.setState({selected})
  }

  showPopover(){
    const popoverOptions = getPopoverOptions(material.deviceWidth, {
      x: 0, 
      y: material.deviceHeight/2 + material.deviceWidth/2,  
      width: material.deviceWidth,       
    })
    this.props.app.popover.show(this.popMenu, popoverOptions)    
  }

  renderSearchResult(){
    const {vault} = this.props
    const searchText = this.props.searchString.toLowerCase()
    const nosearchKeys = ['startDate', '_default', 'endDate', 'privacy']
    const vaultSearchKeys = ['contact', 'groupAddress']
    // we get the search results
    const ret = []
    vaultSearchKeys.forEach(vaultKey =>{
      const vaultItem = vault.VaultInformation[vaultKey]      
      Object.keys(vaultItem.value).forEach(key=>{
        const item = vaultItem.value[key]
        if(item.value && item.nosearch !== true){
          const values = []
          let type = 'field'        
          if(item.value.constructor.name === 'Array'){
            item.value.forEach(subItem => {              
              if(!subItem.value){
                type = 'group'
                // make label, value like a group
                const subValues = []
                Object.keys(subItem).filter(subKey=>!nosearchKeys.includes(subKey))
                .forEach(subKey=>{
                  const subValue = subItem[subKey]                
                  if(subValue.toLowerCase().indexOf(searchText) !== -1){
                    subValues.push({
                      label: subKey.replace(/(^[a-z])|([a-z])(?=[A-Z])/g, (m, g1, g2) => g1 ? m.toUpperCase() : m + ' '), 
                      value: subValue
                    })
                  }
                })
                if(subValues.length){
                  values.push(subValues)
                }
              } else if(subItem.value.toLowerCase().indexOf(searchText) !== -1){
                values.push(subItem.value)
              }
            })
          } else {
            if(item.value.toLowerCase().indexOf(searchText) !== -1){
              values.push(item.value)
            }
          }
          if(values.length){
            ret.push({            
              title: item.label || vaultItem.label,
              type,
              value: values,
            })
          }
        }
      })

    })    

    return (
      <View>
        {ret.map((item, index)=>
          <SearchResultItem key={index} data={item} onCopy={this._onCopy}/>
        )}  
      </View>
    )
  }

  renderVaultInformation(key, vaultInfo){    
    switch(key){
      case 'contact':
        return <Contact vaultInfo={vaultInfo} />
      case 'groupAddress':
        return <Address vaultInfo={vaultInfo} />
      case 'groupFinancial':
        return <Financial vaultInfo={vaultInfo} />
      case 'groupGovernmentID':
        return <GovernmentID vaultInfo={vaultInfo} />
      case 'membership':
        return <Membership vaultInfo={vaultInfo} />
      case 'family':
        return <Relationship vaultInfo={vaultInfo} />
      case 'employment':
        return <Employment vaultInfo={vaultInfo} />
      case 'document':
        return <Document vaultInfo={vaultInfo} />
      case 'education':
        return <Education vaultInfo={vaultInfo} />
      case 'others':
        return <Others vaultInfo={vaultInfo} />
      default:
        return <BasicInformation vaultInfo={vaultInfo} />
    }
  }

  renderVault(){    
    const {vault} = this.props
    if(!vault.VaultInformation){
      return (
        <Spinner />
      )
    }
    const {selected} = this.state
    const selectedOption = this.options[selected]        
    const vaultInfo = vault.VaultInformation[selectedOption.key]    
    return ( 
      <View>        
        <Header options={this.options} selected={selected} onOptionSelect={this._optionSelect}/>
        <Text style={styles.optionTitle}>{vaultInfo.label || selectedOption.title}</Text>
        {this.renderVaultInformation(selectedOption.key, vaultInfo)}
      </View>
    )
  }

  render() {
    const {searchString} = this.props
    // console.log('search',searchString)    
    return (                 
        <Container>                    
            <Content padder refreshing={this.state.refreshing} 
                onRefresh={this._onRefresh}>                            
              {searchString ? this.renderSearchResult() : this.renderVault()}                                       
            </Content>                 
            <AddButton onPress={()=>this.showPopover()}/>  
        </Container>      
    )
  }
}