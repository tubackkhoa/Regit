import React, { Component } from 'react'
import { Container, Form, Item, Input, Button, Text, Thumbnail, Label } from 'native-base'
import styles from './styles'
import { connect } from 'react-redux'
import { setToast } from '~/store/actions/common'

@connect(null, {setToast})
export default class Login extends Component {

  _handleLogin = (event) => {
    this.props.setToast('Login fail', 'danger')
  }

    render() {
        return (
            <Container style={styles.container}>
                                  
              <Thumbnail style={styles.logo} source={require('~/assets/logo.png')} />
              
                <Form>
                    <Item style={styles.item} >
                        <Label style={styles.input}>Username</Label>
                        <Input />
                    </Item>
                    <Item style={styles.item} >
                        <Label style={styles.input}>Password</Label>
                        <Input />
                    </Item>

                    
                    <Button onPress={this._handleLogin} style={styles.button}>
                      <Text>Sign in</Text>
                    </Button>

                    <Text style={styles.label}>Forgot password?</Text>

                    <Button bordered style={styles.outlineButton}>
                      <Text style={styles.whiteColor}>Sign up</Text>
                    </Button>
                    

                </Form>
                
            </Container>
        )
    }
}