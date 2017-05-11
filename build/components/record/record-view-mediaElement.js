'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _draftJs = require('draft-js');

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _previewGenerator = require('./preview-generator');

var _previewGenerator2 = _interopRequireDefault(_previewGenerator);

var _reactImageLightbox = require('react-image-lightbox');

var _reactImageLightbox2 = _interopRequireDefault(_reactImageLightbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecordViewMediaElement = function (_Component) {
  (0, _inherits3.default)(RecordViewMediaElement, _Component);

  function RecordViewMediaElement() {
    (0, _classCallCheck3.default)(this, RecordViewMediaElement);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RecordViewMediaElement.__proto__ || (0, _getPrototypeOf2.default)(RecordViewMediaElement)).call(this));

    _this.openExtendedView = function () {
      var allowedToShowDialog = ["video", "picture"];

      if (allowedToShowDialog.includes(_this.props.type)) {
        _this.setState({ showExtendedDialog: true });
      }
    };

    _this.richTextToComponent = function (textStateFromDB) {
      var componentToReturn;

      try {
        componentToReturn = _draftJs.EditorState.createWithContent((0, _draftJs.convertFromRaw)(JSON.parse(textStateFromDB)));
        componentToReturn = _react2.default.createElement(_draftJsPluginsEditor2.default, { editorState: componentToReturn, onChange: function onChange(value) {
            return null;
          } });
      } catch (e) {
        console.log(e);
        componentToReturn = _react2.default.createElement('div', { style: { marginLeft: 10 }, dangerouslySetInnerHTML: { __html: textStateFromDB } });
      }
      return componentToReturn;
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
        { style: { padding: 3, paddingTop: 5, minWidth: 380, maxWidth: 400, marginLeft: 5, marginTop: 5, display: "inline-block", zIndex: this.state.isOpen ? 200 : 1500 }, onClick: this.openExtendedView },
        this.state.isOpen && _react2.default.createElement(_reactImageLightbox2.default, {
          mainSrc: this.props.media.src

          , onCloseRequest: function onCloseRequest() {
            return _this2.setState({ isOpen: false });
          },
          onMovePrevRequest: function onMovePrevRequest() {
            return _this2.setState({
              photoIndex: (photoIndex + images.length - 1) % images.length
            });
          },
          onMoveNextRequest: function onMoveNextRequest() {
            return _this2.setState({
              photoIndex: (photoIndex + 1) % images.length
            });
          },

          reactModalStyle: { overlay: { zIndex: 5000 } },
          imageCaption: _react2.default.createElement(_Card.CardTitle, { title: this.props.media.copyright ? this.props.media.copyright : "", style: { margin: 0, padding: 0, height: 40 }, titleStyle: { fontSize: "1.5em", lineHeight: 1, padding: 5, color: "white" } })
        }),
        _react2.default.createElement(
          _Dialog2.default,
          {
            title: _react2.default.createElement(
              'h2',
              null,
              ' ',
              this.props.media.title || "",
              ' ',
              _react2.default.createElement('br', null),
              ' ',
              _react2.default.createElement('hr', null),
              ' '
            ),
            actions: actions,
            modal: true,
            open: this.state.showExtendedDialog,
            style: { textAlign: "left" },
            contentStyle: {
              width: '70%',
              maxWidth: 'none',
              minWidth: 900
            }
          },
          _react2.default.createElement(
            'span',
            { onClick: function onClick() {
                return _this2.setState({ isOpen: true });
              }, style: { float: "left", width: "40%", textAlign: "center", marginRight: "1%", cursor: "pointer" } },
            _react2.default.createElement(_previewGenerator2.default, { element: this.props.media, style: { maxHeight: 450, maxWidth: "100%" } }),
            ' ',
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            ' ',
            _react2.default.createElement(
              'span',
              null,
              'Click to enlarge picture'
            )
          ),
          _react2.default.createElement(
            'span',
            { style: { float: "left", width: "59%", textAlign: "left" } },
            _react2.default.createElement(
              'span',
              null,
              this.props.media.copyright ? "Copyright: " + this.props.media.copyright : ""
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'span',
              null,
              'Description:'
            ),
            _react2.default.createElement(
              'div',
              { style: { width: "100%", minHeight: 350, overflowY: "scroll", border: "1px dashed lightgrey", textAlign: "center" } },
              this.props.media.transcript ? this.richTextToComponent(this.props.media.transcript) : _react2.default.createElement('span', null)
            )
          )
        ),
        _react2.default.createElement(
          'span',
          { style: { maxWidth: "100%", fontSize: 15, height: 30 } },
          this.props.media.title
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'span',
          {
            style: {
              float: "left",
              width: this.props.type === "audio" ? "50%" : "100%",
              minWidth: 240
            } },
          _react2.default.createElement(_previewGenerator2.default, { element: this.props.media, style: { maxHeight: 250, maxWidth: "100%", minWidth: 100, marginTop: 5 } })
        ),
        this.props.media.transcript && this.props.media.transcript.length > 0 && (this.props.type === "audio" || this.props.type === "video") ? _react2.default.createElement(_RaisedButton2.default, { label: 'Transcript', style: { height: 30, marginTop: 5 },
          onClick: function onClick() {
            return _this2.state.showTranscript ? _this2.setState({ showTranscript: false }) : _this2.setState({ showTranscript: true });
          } }) : "",
        this.state.showTranscript && this.props.media.transcript && this.props.media.transcript.length > 0 && (this.props.type === "audio" || this.props.type === "video") ? _react2.default.createElement(
          'div',
          { style: { width: "100%", height: 170, overflowY: "scroll", border: "1px dashed lightgrey", textAlign: "center" } },
          this.props.media.transcript ? this.richTextToComponent(this.props.media.transcript) : _react2.default.createElement('span', null)
        ) : _react2.default.createElement('div', null)
      );
    }
  }]);
  return RecordViewMediaElement;
}(_react.Component);

exports.default = RecordViewMediaElement;