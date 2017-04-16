import React, { Component } from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { View,
  Container, Header, Title, Content, Button, Spinner,
  Card, CardItem, Text, Thumbnail, Left, Right, Body, 
} from 'native-base'
import { API_BASE } from '~/store/constants/api'
import * as accountSelectors from '~/store/selectors/account'

import { cardImage } from '~/assets'
import RegitButton from '~/ui/elements/RegitButton'
import Icon from '~/ui/elements/Icon'
import styles from './styles'


@connect(state=>({  
  profile: accountSelectors.getProfile(state),  
}))
export default class extends Component {

  render() {
    const {profile} = this.props
    if(!profile)
      return <Spinner/>

    const avatar = {uri: (API_BASE + profile.PhotoUrl)}
    return (      
        <Card style={styles.container}>
          <CardItem bordered style={styles.firstCard}>
            <Left>
              <Text style={styles.textGray}>EVENT</Text>
            </Left>
            <Right>
              <Button small transparent>                      
                  <Icon style={styles.iconGray} name="more-horiz" />
              </Button>
            </Right>
          </CardItem>
          <CardItem bordered style={styles.avatarContainer}>
            <Left>
                <Thumbnail square source={avatar} />
                <Body>
                    <Text>{profile.DisplayName}</Text>
                    <Text note>{profile.Birthdate}</Text>
                </Body>
            </Left>
            <Right style={{flex:0.5}}>
              <Button style={styles.button} small bordered iconLeft>
                <Icon style={styles.icon} name="follow"/>
                <Text style={styles.text}>Follow</Text>                        
              </Button>
            </Right>
          </CardItem>
          <CardItem header style={styles.headerContainer}>
          <Text>Finibus Bonorum et Malorum</Text>                            
          </CardItem>
          <CardItem content>                  
          <Body>
          <Text style={styles.textGreen}>25 Jun 2016 at 19:00</Text>       
              <Text style={styles.textGreen}>90 Thang Long, W.4, Tan Binh.D, HCMC, VN</Text>           
              <Text>Wait a minute. Wait a minute</Text>
              </Body>
          </CardItem>
          <CardItem cardBody>
              <Image style={styles.image} source={cardImage}/>
          </CardItem>              
          <CardItem footer style={styles.footerContainer}>
              <RegitButton>Join</RegitButton>
          </CardItem>
       </Card>       
    )
  }
}