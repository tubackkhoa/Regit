import Home from './containers/Home'
import Login from './containers/Login'
import UserProfile from './containers/User/Profile'

// we can use animationType object for each route via Navigator.SceneConfigs
export default {
    home: {
        title: 'Select component',
        Page: Home,
    },   
    'user/profile': {
        title: 'User Profile',
        Page: UserProfile,
    },       
    login: {
        title: 'Login',
        Page: Login,
        hiddenBar: true,
    },        
}
