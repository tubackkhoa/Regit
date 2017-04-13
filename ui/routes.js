import Home from './containers/Home'
import NotFound from './containers/NotFound'
import Notification from './containers/Notification'
import Login from './containers/Login'
import UserProfile from './containers/User/Profile'
import UserSetting from './containers/User/Setting'
import Delegation from './containers/Delegation/Index'
import DelegationDetail from './containers/Delegation/Detail'
import ChangePassword from './containers/User/Action/ChangePassword'
import ChangeEmail from './containers/User/Action/ChangeEmail'
import ChangePIN from './containers/User/Action/ChangePIN'
import ChangePhoneNumber from './containers/User/Action/ChangePhoneNumber' 
import ChangeSecurityQuestion from './containers/User/Action/ChangeSecurityQuestion'
import CloseAccount from './containers/User/Action/CloseAccount'

// we can use animationType object for each route via Navigator.SceneConfigs
export default {
    notFound: {
        title: 'Not Found',
        Page: NotFound,
    },
    home: {
        title: 'Home',
        Page: Home,
    },  
    notification: {
        title: 'Notification',
        Page: Notification,
    },   
    delegation: {
        title: 'Delegation',
        Page: Delegation,
    },
    'delegation/detail/:id': {
        title: 'Delegation Detail',
        Page: DelegationDetail,
    },
    'user/profile': {
        title: 'User Profile',
        Page: UserProfile,
    },  
    'user/setting': {
        title: 'User Setting',
        Page: UserSetting,
    },       
    login: {
        title: 'Login',
        Page: Login,
        hiddenBar: true,
    },   
    'user/action/changePassword':{
        title: 'Change Password',
        Page: ChangePassword,
    },    
    'user/action/changeEmail':{
        title: 'Change Email',
        Page: ChangeEmail,
    }, 
    'user/action/changePIN':{
        title: 'Change PIN',
        Page: ChangePIN,
    }, 
    'user/action/changePhoneNumber':{
        title: 'Change Phone',
        Page: ChangePhoneNumber,
    }, 
    'user/action/changeSecurityQuestion':{
        title: 'Change Question',
        Page: ChangeSecurityQuestion,
    }, 
    'user/action/closeAccount':{
        title: 'Close Account',
        Page: CloseAccount,
    }, 
}
