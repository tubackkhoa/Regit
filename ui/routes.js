import Home from './containers/Home'
import Login from './containers/Login'

// we can use animationType object for each route via Navigator.SceneConfigs
export default {
    home: {
        title: 'Select component',
        Page: Home,
    },        

    login: {
        title: 'Login',
        Page: Login,
        hiddenBar: true,
    },        
}
