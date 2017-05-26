'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _previewGenerator = require('./preview-generator');

var _previewGenerator2 = _interopRequireDefault(_previewGenerator);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Card = require('material-ui/Card');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _LinearProgress = require('material-ui/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _draftJs = require('draft-js');

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _draftJsInlineToolbarPlugin = require('draft-js-inline-toolbar-plugin');

var _draftJsInlineToolbarPlugin2 = _interopRequireDefault(_draftJsInlineToolbarPlugin);

var _links = require('../../links');

require('draft-js-inline-toolbar-plugin/lib/plugin.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }



var inlineToolbarPlugin = (0, _draftJsInlineToolbarPlugin2.default)(); 


var InlineToolbar = inlineToolbarPlugin.InlineToolbar;

var RecordAddMedia = function (_Component) {
  (0, _inherits3.default)(RecordAddMedia, _Component);

  function RecordAddMedia() {
    (0, _classCallCheck3.default)(this, RecordAddMedia);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RecordAddMedia.__proto__ || (0, _getPrototypeOf2.default)(RecordAddMedia)).call(this));

    _this.componentWillReceiveProps = function (newProps) {

      var transcript = newProps.prevData ? newProps.prevData.transcript : null;

      if (transcript) {
        try {
          transcript = _draftJs.EditorState.createWithContent((0, _draftJs.convertFromRaw)(JSON.parse(transcript)));
        } catch (e) {
          var blocksFromHTML = (0, _draftJs.convertFromHTML)(transcript);
          var state = _draftJs.ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
          transcript = _draftJs.EditorState.createWithContent(state);
        }

      } else {
        transcript = _draftJs.EditorState.createEmpty();
      }

      _this.setState({ transcriptBuffer: transcript, dataToSend: newProps.prevData, mediaUploaded: newProps.prevData.src ? true : false, previewSource: { src: newProps.prevData.src, type: newProps.prevData.type } });
    };

    _this.progress = function (completed) {
      if (completed >= 100) {
        _this.setState({ completed: 100, mediaUploaded: true });
      } else {
        _this.setState({ completed: completed, mediaUploaded: false });
      }
    };

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

    _this.onChangeTranscriptText = function (value, name) {

      _this.setState({ transcriptBuffer: value });
    };

    _this.focus = function () {
      _this.editor.focus();
    };

    _this.state = {
      previewSource: { src: _links.URL_BASE_MULTIMEDIA_IMAGES + 'institution-default.jpg', type: "image/jpeg" },
      dataToSend: {},
      mediaUploaded: false,
      transcriptBuffer: _draftJs.EditorState.createEmpty()
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
      xhr.open('POST', _links.URL_RECORD_UPLOAD_FILE + this.props.recordId, true);

      xhr.onload = function (e) {
        console.log(xhr.response);

        var fileToUpload = JSON.parse(xhr.response).upload.files[0];

        thisObject.setState({
          previewSource: (0, _extends3.default)({}, fileToUpload, { src: _links.URL_MULTIMEDIA + fileToUpload.src })

        });

        var dat = thisObject.state.dataToSend;
        dat.src = fileToUpload.src;
        dat.type = fileToUpload.type;
        thisObject.setState({ dataToSend: dat });

      };

      xhr.onerror = function (e) {
        console.error(e);
      };

      xhr.upload.onprogress = function (e) {
        if (e.lengthComputable) {
          console.log('e.loaded>> ' + e.loaded);
          console.log('%>> ' + e.total);

          console.log(e.loaded / e.total * 100);

          thisObject.progress(e.loaded / e.total * 100);
        }
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
      currentData[name] = value; 

      console.log(currentData);
      this.setState({ dataToSend: currentData });
    }
  }, {
    key: 'prepareDataToSend',
    value: function prepareDataToSend(data) {
      data.transcript = (0, _stringify2.default)((0, _draftJs.convertToRaw)(this.state.transcriptBuffer.getCurrentContent()));
      this.props.mediaAdder(data);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.props.enableEditor) {
        return _react2.default.createElement('div', null);
      }

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
        disabled: !this.state.mediaUploaded,
        onTouchTap: function onTouchTap(e) {
          return _this2.prepareDataToSend(_this2.state.dataToSend);
        }
      })];

      return _react2.default.createElement(
        _Dialog2.default,
        {
          title: 'Upload File',
          actions: actions,
          modal: true,
          open: true

        },
        _react2.default.createElement(
          'style',
          null,
          "\
                         .editor {\
                           box-sizing: border-box;\
                           border: 1px solid #ddd;\
                           cursor: text;\
                           padding: 16px;\
                           border-radius: 2px;\
                           margin-bottom: 2em;\
                           box-shadow: inset 0px 1px 8px -3px #ABABAB;\
                           background: #fefefe;\
                         }\
                 "
        ),
        _react2.default.createElement(
          'style',
          null,
          "\
                         .editor :global(.public-DraftEditor-content) {\
                           min-height: 140px;\
                         }\
                 "
        ),
        _react2.default.createElement(
          _Card.Card,
          { style: { padding: 5, height: 727, overflowY: "scroll" } },
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
              ),
              _react2.default.createElement(_LinearProgress2.default, {
                mode: 'determinate',
                value: this.state.completed,
                size: 25,
                color: "#76FF03"
              })
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
            _react2.default.createElement(_previewGenerator2.default, { element: this.state.previewSource, style: { height: 300, maxWidth: 700, maxHeight: 300 } })
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'span',
            { style: { fontWeight: "bold" } },
            'Copyright notice: '
          ),
          _react2.default.createElement(_TextField2.default, {
            hintText: 'Copyright Notice',
            onChange: function onChange(event, index, value) {
              return _this2.handleChange(event, value, index, "copyright");
            },
            value: this.state.dataToSend.copyright
          }),
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
            },
            value: this.state.dataToSend.title
          }),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'span',
            { style: { fontWeight: "bold" } },
            'Transcript: '
          ),
          _react2.default.createElement(
            'div',
            { style: { marginLeft: 20, marginTop: 15, paddingBottom: 5, borderBottom: "1px solid #cccccc", height: 300, overflowY: "scroll" }, onClick: this.focus },
            _react2.default.createElement(_draftJsPluginsEditor2.default, { editorState: this.state.transcriptBuffer,
              onChange: function onChange(value) {
                return _this2.onChangeTranscriptText(value, "transcript");
              },
              plugins: [inlineToolbarPlugin],
              ref: function ref(element) {
                _this2.editor = element;
              },
              placeholder: "Start typing here..."
            }),
            _react2.default.createElement(InlineToolbar, null)
          ),
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
      dispatch(push(_links.URL_CONTROL_ROOM_EDIT_RECORD + newRecordId));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RecordAddMedia);