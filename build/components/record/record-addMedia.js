'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

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

var _reactRedux = require('react-redux');

var _fetchData = require('../../network/fetch-data');

var _fetchData2 = _interopRequireDefault(_fetchData);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Card = require('material-ui/Card');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecordAddMedia = function (_Component) {
  (0, _inherits3.default)(RecordAddMedia, _Component);

  function RecordAddMedia() {
    (0, _classCallCheck3.default)(this, RecordAddMedia);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RecordAddMedia.__proto__ || (0, _getPrototypeOf2.default)(RecordAddMedia)).call(this));

    _this.submitFiles = function (e) {
      e.nativeEvent.preventDefault();
      var input = _this._input;
      var data = void 0;
      var files = (0, _from2.default)(input.uploadList.files);

      if (files.length == 0) {
        return;
      }

      _this.sendFiles(files);
    };

    _this.state = { previewSource: { src: "http://localhost:3001/images/institution-default.jpg", type: "image/jpeg" }
    };

    _this._input = {};
    return _this;
  }

  (0, _createClass3.default)(RecordAddMedia, [{
    key: 'componentDidMount',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _ref.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: 'sendFiles',
    value: function sendFiles(files) {
      var thisObject = this;
      var formData = new FormData();
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/record/upload/' + this.props.recordId, true);

      xhr.onload = function (e) {
        console.log(xhr.response);

        var fileToUpload = JSON.parse(xhr.response).upload.files[0];
        fileToUpload.src = "http://localhost:3001/multimedia/" + fileToUpload.src;

        thisObject.setState({ previewSource: fileToUpload, dataToSend: { src: fileToUpload.src, type: fileToUpload.type } });

        console.log((0, _stringify2.default)(thisObject.state));
      };

      xhr.onerror = function (e) {
        console.error(e);
      };

      xhr.upload.onprogress = function (e) {
      };

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(files), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var file = _step.value;

          formData.append('uploadedImages[]', file);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      xhr.send(formData);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event, index, value, name) {
      var currentData = this.state.dataToSend;

      if (!currentData) {
        currentData = {};
      }
      currentData[name] = value.replace(/\n/gm, "<br/>");

      this.setState({ dataToSend: currentData });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.props.recordId) {
        return _react2.default.createElement(
          _Card.Card,
          { style: { padding: 30 } },
          ' '
        );
      }

      var input = this._input;

      var actions = [_react2.default.createElement(_FlatButton2.default, {
        label: 'Cancel',
        primary: true,
        onTouchTap: function onTouchTap(e) {
          return _this2.props.mediaAdder();
        }
      }), _react2.default.createElement(_FlatButton2.default, {
        label: 'Submit',
        primary: true,
        disabled: false,
        onTouchTap: function onTouchTap(e) {
          return _this2.props.mediaAdder(_this2.state.dataToSend);
        }
      })];

      return _react2.default.createElement(
        _Dialog2.default,
        {
          title: 'Dialog With Actions',
          actions: actions,
          modal: true,
          open: true
        },
        _react2.default.createElement(
          _Card.Card,
          { style: { padding: 5 } },
          _react2.default.createElement(
            _Card.Card,
            { style: { padding: 0 } },
            _react2.default.createElement(
              'form',
              {
                name: 'uploadForm',
                role: 'form',
                style: {
                  marginLeft: 30,
                  marginRight: 30
                },
                action: '/api/record/upload/' + this.props.recordId,
                method: 'POST'
              },
              _react2.default.createElement('input', {
                type: 'file',
                multiple: 'multiple',
                name: 'uploadImages',
                ref: function ref(c) {
                  return input.uploadList = c;
                }
              }),
              _react2.default.createElement(
                _FlatButton2.default,
                {
                  id: 'submit',
                  style: { backgroundColor: "#e0ebeb" },
                  type: 'submit',
                  onClick: function onClick(e) {
                    return _this2.submitFiles(e);
                  }
                },
                'Upload'
              )
            )
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'span',
            { style: { fontWeight: "bold" } },
            'Media Preview: '
          ),
          _react2.default.createElement(
            _Card.Card,
            { style: { textAlign: "center" } },
            this.props.mediaPreviewer(this.state.previewSource, { height: 300, maxWidth: 700 })
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'span',
            { style: { fontWeight: "bold" } },
            'Title: '
          ),
          _react2.default.createElement(_TextField2.default, {
            hintText: 'Media Title',
            onChange: function onChange(event, index, value) {
              return _this2.handleChange(event, value, index, "title");
            }
          }),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'span',
            { style: { fontWeight: "bold" } },
            'Transcript: '
          ),
          ' ',
          _react2.default.createElement(_TextField2.default, {
            hintText: 'Transcript Goes Here if applicable',
            multiLine: true,
            rows: 5,
            rowsMax: 10,
            style: { width: 790, border: "1px dashed lightgrey" },
            onChange: function onChange(event, index, value) {
              return _this2.handleChange(event, value, index, "transcript");
            }
          }),
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null)
        )
      );
    }
  }]);
  return RecordAddMedia;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    templateList: state.templateList || null,
    params: ownProps.params,
    location: ownProps.location
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    editNewRecord: function editNewRecord(newRecordId) {
      dispatch(push('/controlRoom/record/edit/' + newRecordId));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RecordAddMedia);