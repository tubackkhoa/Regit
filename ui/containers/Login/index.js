import React, { Component } from 'react'
import { Container, Form, Item, Input, Button, Text, Thumbnail, Label } from 'native-base'
import styles from './styles'

export default class Login extends Component {

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

                    
                    <Button style={styles.button}>
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