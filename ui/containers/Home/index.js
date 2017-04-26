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
import * as campaignSelectors from '~/store/selectors/campaign'
import * as campaignActions from '~/store/actions/campaign'

import Event from '~/ui/components/Event'

import styles from './styles'

@connect(state=>({  
  token: authSelectors.getToken(state),
  activeCampaign: campaignSelectors.getActiveCampaign(state),
  getActiveCampaignRequest: commonSelectors.getRequest(state, 'getActiveCampaign'),  
}), {...campaignActions, ...commonActions})
export default class extends Component {

  constructor(props) {
    super(props)

    this.state = {
      refreshing: false,
      // loading: false,
    }    
  }

  componentDidMount(){
    const {token, activeCampaign, getActiveCampaign} = this.props
    if(!activeCampaign.NewFeedsItemsList) 
      getActiveCampaign(token)       
  }

  componentWillFocus(){
    // make it like before
    this.state.refreshing && this.setState({
      refreshing: false,
    })
  }

  _onRefresh =() => {
    this.setState({refreshing: true})                
    this.props.getActiveCampaign(this.props.token, 0, 10, ()=>this.setState({refreshing: false}))   
  }    

  render() {
    const { activeCampaign } = this.props
  
    return (          
       
        <Container>
                    
            <Content padder refreshing={this.state.refreshing} 
                onRefresh={this._onRefresh}                
            >             
              {activeCampaign.NewFeedsItemsList && activeCampaign.NewFeedsItemsList.map(feed=>
                <Event feed={feed} key={feed.CampaignId} />
              )}              
            </Content>            
            
        </Container>
      
    )
  }
}