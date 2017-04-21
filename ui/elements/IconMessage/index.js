import React, { Component } from 'react'
import { 
  Button, 
  Text,
} from 'native-base'
import Icon from '~/ui/elements/Icon'
import styles from './styles'

export default ({message, icon='copied', color='#39b54a', size=20, style, ...props}) => (
  <Button noPadder transparent style={{...styles.container, ...style}} {...props}>
    <Icon style={{color, fontSize: size * 2}} name={icon}/>
    <Text style={{color, fontSize: size}}>{message}</Text>
  </Button>
)