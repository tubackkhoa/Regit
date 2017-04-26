// may have many reducer

export const campaign = (state = {}, {type, payload}) => {
  switch (type) {   
    case 'app/replaceNetworks':         
      const newState = Object.assign({}, state)
      payload.forEach(item=>newState[item.Name] = {Id: item.Id})
      return newState
    case 'app/replaceNetwork':
      return {...state, [payload.name]: payload.data}
    case 'app/replaceBusinessNetwork':
      return {...state, 'Business Network': payload}      
    default:
      return state
  }
}

