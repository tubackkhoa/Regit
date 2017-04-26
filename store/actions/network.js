// action requestors

export const getNetworks = (...args) => ({
  type: 'app/getNetworks',
  args,
})

export const getNetwork = (...args) => ({
  type: 'app/getNetwork',
  args,
})

export const getBusinessNetwork = (...args) => ({
  type: 'app/getBusinessNetwork',
  args,
})


// action creators
export const replaceNetworks = (data) => ({
  type: 'app/replaceNetworks',
  payload: data,
})

export const replaceNetwork = (data) => ({
  type: 'app/replaceNetwork',
  payload: data,
})

export const replaceBusinessNetwork = (data) => ({
  type: 'app/replaceBusinessNetwork',
  payload: data,
})