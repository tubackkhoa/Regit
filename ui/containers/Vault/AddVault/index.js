import React, { Component } from 'react'
import {                 
    Button, Text, Label, Container,
    ListItem, Item, View, Input, CheckBox, Left,
} from 'native-base'

import Content from '~/ui/components/Content'

import Icon from '~/ui/elements/Icon'

import options from './options'


// base on id will select the initialValue, 
// and we should create a group permission component
// we can use SubmissionError for validate before submit
export default class extends Component {

  render() {       
  
    return (          
       
        <Container>        

            <Content padder>       

              

              <View padder row>
                <Text>Set a role</Text>                
              </View>

              <View regit>                  

                {options.categories.map((item, index) =>
                <ListItem key={index}>                                                                                                 
                  <CheckBox/>
                  <Text>{item.name}</Text>                      
                </ListItem>
                )}
                                
              </View>
               


            </Content>

            
            
        </Container>
      
    )
  }
}