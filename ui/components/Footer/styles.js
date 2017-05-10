import material from '~/theme/variables/material'

export default {
  container: {
    borderTopWidth:0.5,
    borderColor:'#ddd'
  },
  footerIcon: {
    color:material.tabBarTextColor,    
    paddingTop:2,
    marginLeft:5,
    marginRight:5,
    fontSize: 18,
  },
  get footerIconActive() {
    return {...this.footerIcon, color: material.tabBarActiveTextColor}
  },
  button: {
    // move to bottom and stretch to height
    alignSelf: 'flex-end',
    height: '100%',
    backgroundColor: '#fff',
  },
  badgeIcon: {
    marginTop: -18,
  },
  badgeText: {
    left:18,
    top:-2,
  },
}