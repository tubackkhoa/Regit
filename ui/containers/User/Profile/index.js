import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { 
  Container, Header, Title, Content, Button, Icon, List, 
  ListItem, InputGroup, Input, Picker, Text, Thumbnail,
  Body, Left, Right, 
} from 'native-base'
import styles from './styles'
import * as accountSelectors from '~/store/selectors/account'
import { goBack, setToast } from '~/store/actions/common'

import {  
  API_BASE
} from '~/store/constants/api'

@connect(state=>({  
  profile: accountSelectors.getProfile(state),
}), {goBack})
export default class UserProfile extends Component {  

  constructor(props) {
    super(props)
    this.state = {
      selectedItem: undefined,
      selected1: 'key0',
      results: {
        items: [],
      },
    }
  }
  onValueChange(value: string) {
    this.setState({
      selected1: value,
    })
  }

  render() {
    // may have same name
    const {profile, route} = this.props
    const avatar = {uri: (API_BASE + profile.PhotoUrl)}

    return (
      <Container>
        <Header>          
          <Left>
              <Button transparent onPress={()=>this.props.goBack()}>
                  <Icon name="cancel" />
              </Button>
          </Left>
          <Body>
              <Title full>{route.title}</Title>
          </Body>
          <Right>
            <Button transparent>
                  <Icon name="save" />
              </Button>
          </Right>
        </Header>

        <Content>
          <TouchableOpacity>
            <Thumbnail size={80} source={avatar} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10 }} />
          </TouchableOpacity>
          <List>
            <ListItem>
              <InputGroup>
                <Input inlineLabel label="First Name" placeholder="John" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input inlineLabel label="Last Name" placeholder="Doe" />
              </InputGroup>
            </ListItem>
            <ListItem iconLeft>
              
              <Text>GENDER</Text>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.selected1}
                onValueChange={this.onValueChange.bind(this)} // eslint-disable-line
              >
                <Picker.Item label="Male" value="key0" />
                <Picker.Item label="Female" value="key1" />
                <Picker.Item label="Other" value="key2" />
              </Picker>
            </ListItem>

            <ListItem>
              <InputGroup >
                <Input stackedLabel label="Permanent Address" placeholder="Address" />
              </InputGroup>
            </ListItem>
          </List>
          
        </Content>
      </Container>
    )
  }
}
