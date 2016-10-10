import {
  cyan700,
  grey600,
  pinkA100, pinkA200, pinkA400,
  fullWhite,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/utils/colorManipulator';

export default {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#3F51B5',
    primary2Color: 'white',
    primary3Color: grey600,
    // accent1Color: pinkA200,
    // accent2Color: pinkA400,
    // accent3Color: pinkA100,
    textColor: '#333333',
    // alternateTextColor: '#303030',
    // canvasColor: '#303030',
    // borderColor: fade(fullWhite, 0.3),
    // disabledColor: fade(fullWhite, 0.3),
    // pickerHeaderColor: fade(fullWhite, 0.12),
    // clockCircleColor: fade(fullWhite, 0.12),
    selectionColor: '#303030',
    selectionBackground: '#f0f030',
    chip: '#efefef',
    chipSelected: '#ff5f5f',
  },
};
// event.nativeEvent.stopPropagation();
// event.nativeEvent.stopImmediatePropagation();
