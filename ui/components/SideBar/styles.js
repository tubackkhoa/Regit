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
    borderBottomWidth: 1,
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
    color: '#FFF',
  },
  iconEdit: {
    position:'absolute', 
    left:'50%',
    bottom:20, 
    marginLeft:60, 
    color: '#fff',
    fontSize:14
  },
  listItem: {
    borderColor: '#464646',
  },
  iconText: {
    fontSize: (Platform.OS === 'ios') ? 13 : 11,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: (Platform.OS === 'android') ? -3 : undefined,
    color: '#FFF',
  },
  iconTextLast: {
    color: '#ce2d30',
    paddingLeft: 20,
  }
};