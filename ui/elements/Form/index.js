import React, { Component } from 'react'

import { 
  Item, 
  Input, 
  Text, 
  Label,    
} from 'native-base'

import Icon from '~/ui/elements/Icon'
import Switch from '~/ui/elements/Switch'

import DatePicker from '~/ui/components/DatePicker'
import Dropdown from '~/ui/components/Dropdown'
import Toggle from '~/ui/components/Toggle'
import material from '~/theme/variables/material'
import styles from './styles'

export const InputField = ({ input, label, meta: { touched, error, warning }, icon, onPress, ...custom }) => (  
  <Item style={styles.item} error={touched && !!error} onPress={onPress} >  
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

export const SwitchField = ({ input, meta: { touched, error, warning }, ...custom }) => (
  <Switch         
    value={!!input.value}
    width={45}
    circleColor={material.activeTab}    
    backgroundActive={material.tabBarActiveTextColor}
    backgroundInactive="#898989"
    onSyncPress={input.onChange}
    {...custom}    
  />
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

export const DropdownField = ({ input, label, meta: { touched, error, warning }, onSelected, ...custom }) => (
  <Dropdown error={touched && !!error}    
    selected={input.value}    
    header={label} 
    onChange={(value) => {
      onSelected && onSelected(value)
      input.onChange(value)
    }}
    style={styles.item}
    inputStyle={styles.input}
    inputIconStyle={styles.inputIcon}
    {...custom}    
  />
)