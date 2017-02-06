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

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _borderColor = require('material-ui/svg-icons/editor/border-color');

var _borderColor2 = _interopRequireDefault(_borderColor);

var _clear = require('material-ui/svg-icons/content/clear');

var _clear2 = _interopRequireDefault(_clear);

var _Card = require('material-ui/Card');

var _previewGenerator = require('./preview-generator');

var _previewGenerator2 = _interopRequireDefault(_previewGenerator);

var _stringTools = require('../stringTools');

var _stringTools2 = _interopRequireDefault(_stringTools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecordMediaPreviewer = function (_Component) {
  (0, _inherits3.default)(RecordMediaPreviewer, _Component);

  function RecordMediaPreviewer() {
    (0, _classCallCheck3.default)(this, RecordMediaPreviewer);
    return (0, _possibleConstructorReturn3.default)(this, (RecordMediaPreviewer.__proto__ || (0, _getPrototypeOf2.default)(RecordMediaPreviewer)).call(this));
  }

  (0, _createClass3.default)(RecordMediaPreviewer, [{
    key: 'render',
    value: function render() {
      var _this2 = this;


      return _react2.default.createElement(
        _Card.Card,
        { style: { padding: 3, width: 220, height: 190, float: "left", marginLeft: 5, marginTop: 5 } },
        _react2.default.createElement(
          _IconButton2.default,
          { style: { float: "right" }, onClick: function onClick() {
              return _this2.props.mediaDeleter(_this2.props.media.type, _this2.props.index);
            } },
          _react2.default.createElement(_clear2.default, null)
        ),
        _react2.default.createElement(
          'span',
          { style: { maxWidth: "60%" } },
          this.props.media.title
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(_previewGenerator2.default, { element: this.props.media, style: { height: 100, maxWidth: 100 } })
        )
      );
    }
  }]);
  return RecordMediaPreviewer;
}(_react.Component);

exports.default = RecordMediaPreviewer;