import React, { Component } from 'react'
import {                 
    Button,         
    Icon,     
    Container,
    Text,    
    Item,
    View,
    Input,
} from 'native-base'

import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import * as authSelectors from '~/store/selectors/auth'
import * as commonSelectors from '~/store/selectors/common'
import * as accountSelectors from '~/store/selectors/account'
import * as accountActions from '~/store/actions/account'

import Event from '~/ui/components/Event'

import styles from './styles'

@connect(state=>({  
  token: authSelectors.getToken(state),
  profile: accountSelectors.getProfile(state),
  getProfileRequest: commonSelectors.getRequest(state, 'getProfile'),  
}), {...accountActions, ...commonActions})
export default class extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
    }
  }

  componentDidMount(){    
    if(!this.props.profile){      
      this.props.getProfile(this.props.token)
    }    
  }

  _onRefresh =() => {
    this.props.getProfile(this.props.token)
  }    

  render() {
    const { getProfileRequest } = this.props
    return (          
       
        <Container>
                    
            <Content padder refreshing={getProfileRequest.status === 'pending'}
                onRefresh={this._onRefresh}                
            >              
              <Event />              
            </Content>            
            
        </Container>
      
    )
  }
}