import { Platform } from 'react-native';
import _ from 'lodash';

import variable from './../variables/platform';

export default (variables = variable) => {
  const contentTheme = {
      '.padder': {
        padding: variables.contentPadding,
      },
      flex: 1,
      backgroundColor: '#eaeaea',
      'NativeBase.Segment': {
        borderWidth: 0,
        backgroundColor: '#eaeaea'
      }
  };

  return contentTheme;
};
