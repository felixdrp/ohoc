'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('material-ui/styles/colors');

var _colorManipulator = require('material-ui/utils/colorManipulator');

var _colorManipulator2 = _interopRequireDefault(_colorManipulator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  spacing: _colorManipulator2.default,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#3F51B5',
    primary2Color: 'white',
    primary3Color: _colors.grey600,
    textColor: '#333333',
    selectionColor: '#303030',
    selectionBackground: '#f0f030',
    chip: '#efefef',
    chipSelected: '#ff5f5f'
  }
};
