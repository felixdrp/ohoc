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

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _reactRouter = require('react-router');

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Card = require('material-ui/Card');

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _List = require('material-ui/List');

var _Subheader = require('material-ui/Subheader');

var _Subheader2 = _interopRequireDefault(_Subheader);

var _navigateNext = require('material-ui/svg-icons/image/navigate-next');

var _navigateNext2 = _interopRequireDefault(_navigateNext);

var _stringTools = require('../stringTools');

var _stringTools2 = _interopRequireDefault(_stringTools);

var _fetchData = require('../../network/fetch-data');

var _fetchData2 = _interopRequireDefault(_fetchData);

var _links = require('../../links');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListView = function (_Component) {
  (0, _inherits3.default)(ListView, _Component);

  function ListView() {
    (0, _classCallCheck3.default)(this, ListView);
    return (0, _possibleConstructorReturn3.default)(this, (ListView.__proto__ || (0, _getPrototypeOf2.default)(ListView)).apply(this, arguments));
  }

  (0, _createClass3.default)(ListView, [{
    key: 'render',



    value: function render() {

      var avatarStyle = { height: 50 };

      var baseAvatarImage = _links.URL_BASE_MULTIMEDIA_IMAGES + '/institution-default.jpg';

      return _react2.default.createElement(
        _List.List,
        null,
        _react2.default.createElement(
          _Subheader2.default,
          { style: { fontWeight: "bolder" } },
          (0, _stringTools2.default)(this.props.subcategoryId)
        ),
        this.props.entries.map(function (entry, i) {
          return _react2.default.createElement(
            _reactRouter.Link,
            { to: _links.URL_VIEW_RECORD + entry.id, key: i, style: { textDecoration: 'none' } },
            ' ',
            _react2.default.createElement(_List.ListItem, {
              primaryText: (0, _stringTools2.default)(entry.data.recordName),
              leftAvatar: _react2.default.createElement('img', { style: avatarStyle,
                src: entry.data.featuredImage ? _links.URL_MULTIMEDIA + entry.data.featuredImage : baseAvatarImage
              }),
              rightIcon: _react2.default.createElement(_navigateNext2.default, null)
            }),
            ' '
          );
        })
      );
    }
  }]);
  return ListView;
}(_react.Component);

exports.default = ListView;