/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
  AppRegistry,
  StatusBar,  
} from 'react-native'

import Regit from './ui'

StatusBar.setBarStyle('default')
// registry
AppRegistry.registerComponent('Regit', () => Regit)