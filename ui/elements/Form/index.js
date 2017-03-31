import React, { Component } from 'react'

import { 
  Item, 
  Input, 
  Text, 
  Label,
} from 'native-base'

import material from '~/native-base-theme/variables/material'
import styles from './styles'

export const InputField = ({ input, label, meta: { touched, error, warning }, ...custom }) => (  
  <Item style={styles.item} error={touched && !!error}>  
    <Input    
      placeholder={label}    
      {...input}                   
      {...custom}
      placeholderTextColor={material.inputColorPlaceholder} 
      style={styles.input}     
    />
  </Item>
)