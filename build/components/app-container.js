'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _muiLMSTheme = require('../muiLMSTheme');

var _muiLMSTheme2 = _interopRequireDefault(_muiLMSTheme);

var _commonView = require('./common-view');

var _commonView2 = _interopRequireDefault(_commonView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var muiTheme = (0, _getMuiTheme2.default)(_muiLMSTheme2.default);

(0, _reactTapEventPlugin2.default)();

var AppContainer = function (_Component) {
  (0, _inherits3.default)(AppContainer, _Component);

  function AppContainer() {
    (0, _classCallCheck3.default)(this, AppContainer);
    return (0, _possibleConstructorReturn3.default)(this, (AppContainer.__proto__ || (0, _getPrototypeOf2.default)(AppContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(AppContainer, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'maincontainer' },
        _react2.default.createElement(
          _MuiThemeProvider2.default,
          { muiTheme: muiTheme },
          _react2.default.createElement(_commonView2.default, this.props)
        )
      );
    }
  }]);
  return AppContainer;
}(_react.Component);

exports.default = AppContainer;