export const getProfile = (...args) => ({
  type: 'app/getProfile',
  args
})

export const replaceProfile = (data) => ({
  type: 'app/replaceProfile',
  payload: data,
})