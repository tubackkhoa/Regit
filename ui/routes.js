import Home from './containers/Home'
import NotFound from './containers/NotFound'
import Notification from './containers/Notification'
import Login from './containers/Login'
import UserProfile from './containers/User/Profile'
import UserSetting from './containers/User/Setting'
import Delegation from './containers/Delegation/Index'
import DelegationDetail from './containers/Delegation/Detail'
import ActivityLog from './containers/ActivityLog'
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
        headerType: 'none',
        footerType: 'none',
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
        headerType: 'back',
        footer: false,
    },
    'user/profile': {
        title: 'User Profile',
        Page: UserProfile,
        headerType: 'none',
    },  
    'user/setting': {
        title: 'User Setting',
        Page: UserSetting,
    },       
    login: {
        title: 'Login',
        Page: Login,
        hiddenBar: true,
        headerType: 'none',
        footerType: 'none',
    },   
    'user/action/changePassword':{   
        title: 'Change Password',
        Page: ChangePassword,
        headerType: 'back',
        footerType: 'none',
    },    
    'user/action/changeEmail':{
        title: 'Change Email',
        Page: ChangeEmail,
        headerType: 'back',
        footerType: 'none',
    }, 
    'user/action/changePIN':{
        title: 'Change PIN',
        Page: ChangePIN,
        headerType: 'back',
        footerType: 'none',
    }, 
    'user/action/changePhoneNumber':{
        title: 'Change Phone',
        Page: ChangePhoneNumber,
        headerType: 'back',
        footerType: 'none',
    }, 
    'user/action/changeSecurityQuestion':{
        title: 'Change Question',
        Page: ChangeSecurityQuestion,
        headerType: 'back',
        footerType: 'none',
    }, 
    'user/action/closeAccount':{
        title: 'Close Account',
        Page: CloseAccount,
        headerType: 'back',
        footerType: 'none',
    }, 
    activityLog:{
        title: 'Activity Log',
        Page: ActivityLog,
        headerType: 'searchBack',
    }
}
