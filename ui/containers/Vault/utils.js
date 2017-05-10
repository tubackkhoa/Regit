export const getPopoverOptions = (popoverWidth, fromRect, arrowPadding=-5) => ({
  fromRect,
  // from center
  translateOrigin: {x:popoverWidth/2-20},
  placement: 'top',
  contentStyle:{
    width:popoverWidth,
    height: popoverWidth,
    padding:0,    
    backgroundColor: 'transparent',       
  },
  popoverStyle:{
    right: 0,    
    shadowColor: 'transparent',
  },
  backgroundStyle:{
    backgroundColor:'rgba(25,42,56,0.95)'
  },
  arrowStyle:{
    borderTopColor:'transparent'    
  },
})