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

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _borderColor = require('material-ui/svg-icons/editor/border-color');

var _borderColor2 = _interopRequireDefault(_borderColor);

var _clear = require('material-ui/svg-icons/content/clear');

var _clear2 = _interopRequireDefault(_clear);

var _Card = require('material-ui/Card');

var _previewGenerator = require('./previewGenerator');

var _previewGenerator2 = _interopRequireDefault(_previewGenerator);

var _stringTools = require('../stringTools');

var _stringTools2 = _interopRequireDefault(_stringTools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecordViewMediaElement = function (_Component) {
  (0, _inherits3.default)(RecordViewMediaElement, _Component);

  function RecordViewMediaElement() {
    (0, _classCallCheck3.default)(this, RecordViewMediaElement);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RecordViewMediaElement.__proto__ || (0, _getPrototypeOf2.default)(RecordViewMediaElement)).call(this));

    _this.openExtendedView = function () {

      _this.setState({ showExtendedDialog: true });
    };

    _this.state = { showExtendedDialog: false };
    return _this;
  }

  (0, _createClass3.default)(RecordViewMediaElement, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      console.log(this.props.media);
      var actions = [_react2.default.createElement(_FlatButton2.default, {
        label: 'Close [X]',
        primary: true,
        onTouchTap: function onTouchTap() {
          return _this2.setState({ showExtendedDialog: false });
        }
      })];

      return _react2.default.createElement(
        _Card.Card,
        { style: { padding: 3, maxWidth: 300, height: 300, float: "left", marginLeft: 5, marginTop: 5 }, onClick: this.openExtendedView },
        _react2.default.createElement(
          _Dialog2.default,
          {
            title: this.props.media.title || "dialog",
            actions: actions,
            modal: true,
            open: this.state.showExtendedDialog
          },
          _react2.default.createElement(
            'span',
            null,
            this.props.mediaPreviewer(this.props.media, { maxHeight: 250, maxWidth: "95%" })
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'span',
            null,
            'Transcript/Description'
          ),
          _react2.default.createElement(
            'div',
            { style: { width: "100%", minHeight: 300, maxHeight: 350, overflowY: "scroll", border: "1px dashed lightgrey", textAlign: "center" } },
            this.props.media.transcript.split("<br/>").map(function (e, j) {
              return _react2.default.createElement(
                'span',
                { key: j },
                _react2.default.createElement('br', null),
                e
              );
            }) || "transcript"
          )
        ),
        _react2.default.createElement(
          'span',
          { style: { maxWidth: "100%" } },
          this.props.media.title
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'span',
          null,
          (0, _previewGenerator2.default)(this.props.media, { maxHeight: 250, maxWidth: "95%" })
        )
      );
    }
  }]);
  return RecordViewMediaElement;
}(_react.Component);

exports.default = RecordViewMediaElement;