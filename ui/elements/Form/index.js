import React, { Component } from 'react'

import { 
  Item, 
  Input, 
  Text, 
  Label,
  Icon,
} from 'native-base'

import DatePicker from '~/ui/components/DatePicker'
import Toggle from '~/ui/components/Toggle'
import material from '~/theme/variables/material'
import styles from './styles'

export const InputField = ({ input, label, meta: { touched, error, warning }, icon, ...custom }) => (  
  <Item style={styles.item} error={touched && !!error}>  
    <Input   
      placeholder={label}    
      {...input}                   
      {...custom}
      placeholderTextColor={material.inputColorPlaceholder} 
      style={styles.input}     
    />    
    {icon && <Icon
      style={styles.inputIcon}
      name={icon}
    />}
  </Item>
)

export const DateField = ({ input, label, meta: { touched, error, warning }, format="MM/DD/YYYY", ...custom }) => (
  <DatePicker    
    date={input.value}
    mode="date"
    placeholder={label}    
    onDateChange={(date) => input.onChange(date)}
    customStyles={{
      dateTouch: styles.item,
      dateInput: styles.input,
    }}
    format={format}
    {...custom}    
  />
)

export const LockField = ({ input, label, meta: { touched, error, warning }, ...custom }) => (
  <Toggle    
    checked={input.value}    
    title={label} 
    onToggle={(value) => input.onChange(value)}
    {...custom}    
  />
)