import { matchPath } from 'react-router'
import routes from '~/ui/routes'

export const getPage = (pathname) => {  
  for(route in routes) {
    const match = matchPath(pathname, {
      path:route,
      exact: true,
      strict: false,
    })
    if(match) {      
      return {...routes[route], ...match}
    }
  }  
}