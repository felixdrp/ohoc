'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _Card = require('material-ui/Card');

var _link = require('material-ui/svg-icons/content/link');

var _link2 = _interopRequireDefault(_link);

var _stringTools = require('../stringTools');

var _stringTools2 = _interopRequireDefault(_stringTools);

var _fetchData = require('../../network/fetch-data');

var _fetchData2 = _interopRequireDefault(_fetchData);

var _recordViewMediaElement = require('./record-view-mediaElement');

var _recordViewMediaElement2 = _interopRequireDefault(_recordViewMediaElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecordView = function (_Component) {
  (0, _inherits3.default)(RecordView, _Component);

  function RecordView() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RecordView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RecordView.__proto__ || (0, _getPrototypeOf2.default)(RecordView)).call.apply(_ref, [this].concat(args))), _this), _this.getPreviewer = function (elem) {
      var style = { maxWidth: 290, maxHeight: 250 };
      if (elem.src) if (elem.type.includes("image/")) {
        return _react2.default.createElement('img', { style: style, src: elem.src });
      } else if (elem.type.includes("audio/")) {
        return _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement('img', { style: { maxWidth: 290 }, src: _this.state.recordData.recordById[0].data.featuredImage || "http://localhost:3001/images/institution-default.jpg" }),
          _react2.default.createElement('audio', { style: style, controls: true, src: elem.src }),
          ' '
        );
      } else if (elem.type.includes("video/")) {
        return _react2.default.createElement('video', { style: style, controls: true, src: elem.src });
      } else {
        return _react2.default.createElement(
          'span',
          { style: { width: "100%", textAlign: "center" } },
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'a',
            { style: style, href: elem.src, target: "_blank" },
            _react2.default.createElement(_link2.default, { style: { width: 80, height: 80 } }),
            _react2.default.createElement('br', null),
            "Open in new tab: " + elem.title
          )
        );
      }
      return _react2.default.createElement('span', null);
    }, _this.getMediaPreviewers = function (arrayOfMedia) {

      if (Array.isArray(arrayOfMedia) && arrayOfMedia.length > 0) {
        return _react2.default.createElement(
          'div',
          { style: { width: "100%", height: 310, padding: 5, border: "1px dashed lightgrey", backgroundColor: "lightgrey" } },
          arrayOfMedia.map(function (element, i) {
            return _react2.default.createElement(_recordViewMediaElement2.default, { key: i, style: { maxHeight: 300, maxWidth: 300 }, media: element, mediaPreviewer: _this.getPreviewer });
          })
        );
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RecordView, [{
    key: 'componentDidMount',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var fetch, recordData;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fetch = new _fetchData2.default();

                recordData = void 0;
                _context.prev = 2;
                _context.next = 5;
                return fetch.getRecordData(this.props.params.recordId);

              case 5:
                recordData = _context.sent;

                this.setState({ recordData: recordData });
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](2);

                console.error('fetching record data > ' + _context.t0);

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9]]);
      }));

      function componentDidMount() {
        return _ref2.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: 'render',
    value: function render() {
      var style = {
        margin: 12
      };

      if (!this.state || !this.state.recordData) {
        return _react2.default.createElement('div', null);
      }

      var recordData = this.state.recordData.recordById[0];

      return _react2.default.createElement(
        _Card.Card,
        { style: { padding: 50, paddingTop: 30 } },
        _react2.default.createElement(
          'span',
          { style: { height: 300 } },
          _react2.default.createElement(
            'span',
            null,
            ' ',
            _react2.default.createElement('img', { style: { height: 300, width: 450, border: "1px solid black" }, src: recordData.data.featuredImage || "http://localhost:3001/images/institution-default.jpg" }),
            '  '
          ),
          _react2.default.createElement(
            'span',
            { style: { height: 300, width: 600, position: "absolute", float: "left", left: 700 } },
            _react2.default.createElement(
              'h1',
              null,
              (0, _stringTools2.default)(recordData.data.recordName)
            ),
            _react2.default.createElement(
              'h3',
              null,
              (0, _stringTools2.default)(recordData.type) + "/" + (0, _stringTools2.default)(recordData.subtype)
            )
          )
        ),
        _react2.default.createElement(
          _Card.Card,
          { style: { padding: 50, paddingTop: 10, marginTop: 20 } },
          recordData.data.fields.map(function (entry, i) {
            return _react2.default.createElement(
              'div',
              { key: i },
              entry.name === "featuredImage" ? "" : _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'h2',
                  null,
                  (0, _stringTools2.default)(entry.name)
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  entry.data.split("<br/>").map(function (e) {
                    return _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement('br', null),
                      e
                    );
                  })
                )
              )
            );
          })
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'span',
          { style: { fontWeight: "bolder", fontSize: 18 } },
          'Image Gallery'
        ),
        this.getMediaPreviewers(recordData.data.media.picture),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'span',
          { style: { fontWeight: "bolder", fontSize: 18 } },
          'Audio Gallery'
        ),
        this.getMediaPreviewers(recordData.data.media.audio),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'span',
          { style: { fontWeight: "bolder", fontSize: 18 } },
          'Video Gallery'
        ),
        this.getMediaPreviewers(recordData.data.media.video),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'span',
          { style: { fontWeight: "bolder", fontSize: 18 } },
          'Text and PDF files'
        ),
        this.getMediaPreviewers(recordData.data.media.text)
      );
    }
  }]);
  return RecordView;
}(_react.Component);

exports.default = RecordView;