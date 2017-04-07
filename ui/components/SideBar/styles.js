const React = require('react-native');

const { StyleSheet, Platform, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    flex: 1, 
    backgroundColor: '#363636',    
  },

  drawerCover: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor:'#8e8e8e',
    height: 220,    
    position: 'relative',        
  },
  drawerImage: {    
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#363636',   
  },
  iconContainer: {
    width: 37,
    height: 37,
    borderRadius: 18,
    marginRight: 12,
    paddingTop: (Platform.OS === 'android') ? 7 : 5,
  },

  sidebarIcon: {
    fontSize: 21,
    color: '#fff',
    lineHeight: (Platform.OS === 'android') ? 21 : 25,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  text: {
    fontWeight: (Platform.OS === 'ios') ? '400' : '300',        
    color: '#FFF',    
  },
  icon: {    
    width: 20,
    height: 20,
  },
  editContainer:{
    flexDirection:'row',
    paddingLeft:35
  },
  iconEdit: {    
    marginLeft: 10, 
    marginTop: -10,
    color: '#fff',    
    width: 25,
    height: 25,
  },
  iconText: {
    fontSize: (Platform.OS === 'ios') ? 14 : 12,
    fontWeight: '400',    
    textAlign: 'center',    
    color: '#FFF',
    marginLeft: 20,
  },
  iconTextLast: {
    color: '#ce2d30',
    paddingLeft: 20,
  }
};