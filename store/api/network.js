import { apiGet, apiPost } from '~/store/api/common'

export default {

  getNetworks() {    
    return apiGet('/Api/Networks')
  },

  getNetwork(id, name) {
    return apiGet('/Api/Data/Country/City', {countryCode})
  },  

  getBusinessNetwork(Start=0, Length=10, UserId='') {
    return apiGet('/Api/AccountSettings/Followee', {Start, Length, UserId})
  },  

}

