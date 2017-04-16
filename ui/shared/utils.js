import material from '~/theme/variables/material'

export const getPopoverOptions = (popoverWidth, fromRect, arrowPadding=-5) => ({
  fromRect,
  // from center
  translateOrigin: {x:popoverWidth/2-20},
  placement: 'auto',
  contentStyle:{
    width:popoverWidth,
    padding:0,
  },
  popoverStyle:{
    left: material.deviceWidth-popoverWidth -3,
  },
  backgroundStyle:{
    backgroundColor:'rgba(0,0,0,0.2)'
  },
  arrowStyle:{
    // borderTopColor:'transparent'
    left: popoverWidth - 30 + arrowPadding,
  },
})