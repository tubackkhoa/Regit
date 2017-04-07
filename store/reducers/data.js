
export const dataReducer = (state = {cities:[], countries:[]}, {type, payload}) => {
  switch (type) {   
    case 'app/replaceCountries':      
      return {...state, countries: payload.Countries } 
    case 'app/replaceCities':      
      return {...state, cities: payload.Cities }  
    default:
      return state
  }
}

