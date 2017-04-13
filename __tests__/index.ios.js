import 'react-native';
import React from 'react';
// import Index from '../index.ios.js';

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';
import { matchPath } from 'react-router'
const routes = {
  'abc': false,
  'delegation':true,
  'delegation/detail/:id':true,
  'def': false,
}

const matchRoutes = (pathname) => {
  let match = null
  for(route in routes) {
    match = matchPath(pathname, {
      path:route,
      exact: true,
      strict: false,
    })
    if(match) 
      break    
  }
  return match
}

it('renders correctly', () => {
  const match = matchRoutes('delegation/detail/refresh')
  
  console.log(match)
});
