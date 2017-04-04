import { fetchJson, fetchJsonWithToken, apiPost } from '~/store/api/common'

export default {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} token The token of the user  
  */
  loginFacebook (accessToken) {  
    // Post request to server
    return fetchJson(`/oauth/facebook/token?access_token=${accessToken}`, {
      method: 'POST',      
    })
  },

  loginGoogle (accessToken) {  
    // Post request to server
    return fetchJson(`/oauth/google/token?access_token=${accessToken}`, {
      method: 'POST',      
    })
  },

  login (username, password) {
    return apiPost(`/token`, {      
      username,
      password,
      grant_type: 'password',
    })
  },

  refreshAccessToken (refreshToken) {
    return fetchJson(`/auth/token`, {
      method: 'POST',
      body: JSON.stringify({refreshToken})
    })
  },

  reject (refreshToken) {
    return fetchJson(`/auth/reject`, {
      method: 'POST',
      body: JSON.stringify({refreshToken})
    })
  },
  
  /**
  * Logs the current user out
  */
  logout (accessToken) {
    // return fetchJsonWithToken(token, `/logout`)
    return apiPost(`/api/Account/Logout`, {}, accessToken)
  },

}
