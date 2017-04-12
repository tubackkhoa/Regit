import { Platform } from 'react-native';
import _ from 'lodash';

import variable from './../variables/platform';

export default (variables = variable) => {
  const iconTheme = {
    fontSize: variables.iconFontSize,
    color: '#000',
    backgroundColor:'transparent',
    '.large': {
      fontSize:28,
    },
  };


  return iconTheme;
};
