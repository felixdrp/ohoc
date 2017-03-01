'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _draftJs = require('draft-js');

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _draftJsInlineToolbarPlugin = require('draft-js-inline-toolbar-plugin');

var _draftJsInlineToolbarPlugin2 = _interopRequireDefault(_draftJsInlineToolbarPlugin);

var _draftJsButtons = require('draft-js-buttons');

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Card = require('material-ui/Card');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _recordAddMedia = require('./record-addMedia');

var _recordAddMedia2 = _interopRequireDefault(_recordAddMedia);

var _recordMediaPreviewer = require('./record-mediaPreviewer');

var _recordMediaPreviewer2 = _interopRequireDefault(_recordMediaPreviewer);

var _multipleRowInput = require('../multiple-row-input');

var _reactRouter = require('react-router');

require('draft-js-inline-toolbar-plugin/lib/plugin.css');

var _links = require('../../links');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


var RecordEdit = function (_Component) {
  (0, _inherits3.default)(RecordEdit, _Component);

  function RecordEdit() {
    (0, _classCallCheck3.default)(this, RecordEdit);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RecordEdit.__proto__ || (0, _getPrototypeOf2.default)(RecordEdit)).call(this));

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

    _this.deleteMedia = function (type, i) {

      var recordData = _this.state.recordData;
      var allowedTypes = ["image", "audio", "video", "text"];
      var selectedType = type.split("/")[0];

      if (allowedTypes.includes(selectedType)) {
        selectedType = selectedType == "image" ? "picture" : selectedType;
        recordData.data.media[selectedType].splice(i, 1);
      }

      _this.setState({ recordData: recordData });
    };

    _this.updateMedia = function (type, i, data) {
      _this.setState({ showMediaAdder: true, previousData: data });
    };

    _this.addMediaElement = function (mediaObject) {
      _this.setState({ showMediaAdder: false });

      if (!mediaObject) {
        return;
      }

      mediaObject.src = mediaObject.src.replace(_links.URL_MULTIMEDIA, "");

      var recordData = _this.state.recordData;

      if (Array.isArray(recordData.data.media)) {
        recordData.data.media = { "text": [], "audio": [], "video": [], "picture": [] };
      }

      var allowedTypes = ["image", "audio", "video", "text", "application"];
      var selectedType = mediaObject.type.split("/")[0];

      if (allowedTypes.includes(selectedType)) {
        selectedType = selectedType == "image" ? "picture" : selectedType;
        selectedType = selectedType == "application" ? "text" : selectedType;
        var i = recordData.data.media[selectedType].findIndex(function (element) {
          return mediaObject.src == element.src;
        });

        if (i > -1) {
          recordData.data.media[selectedType].splice(i, 1);
        }
        recordData.data.media[selectedType].push(mediaObject);
      }

      _this.setState({ recordData: recordData });
    };

    _this.focus = function (e) {

      _this.editor[e].focus();

    };

    _this.onChangeRichText = function (index, name, value) {
      _this._input[index] = value;
      var dataToSend = _this.state.dataToSend;

      if (!dataToSend) {
        dataToSend = {};
      }

      dataToSend[name] = value; 
      _this.setState({ dataToSend: dataToSend });
    };

    _this.state = {
      value: '',
      toolbarPlugins: {}
    };

    _this._input = {};
    return _this;
  }

  (0, _createClass3.default)(RecordEdit, [{
    key: 'componentDidMount',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var fetch, recordData, dataToSend, fieldKey, infoField, itemList, a;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fetch = new _fetchData2.default();

                recordData = void 0;
                dataToSend = {};
                _context.prev = 3;
                _context.next = 6;
                return fetch.getRecordData(this.props.params.recordId);

              case 6:
                recordData = _context.sent;
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](3);

                console.error('fetching record data > ' + _context.t0);

              case 12:
                if (!(recordData === undefined)) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt('return');

              case 14:

                recordData = recordData.recordById[0];

                if ((0, _keys2.default)(recordData.data).length < 1) {
                  recordData.data.fields = [];

                  for (fieldKey in recordData.structure.info) {
                    infoField = recordData.structure.info[fieldKey];

                    recordData.data.fields.push({ data: "", type: infoField.type, name: infoField.name });
                  }

                  recordData.data.media = JSON.parse((0, _stringify2.default)(recordData.structure.media));
                } else {
                  dataToSend['featuredImage'] = recordData.data.featuredImage;
                  itemList = recordData.data.fields;

                  for (a in itemList) {
                    dataToSend[itemList[a].name] = itemList[a].data;
                  }
                }

                this.setState({
                  recordData: recordData,
                  submitted: false,
                  dataToSend: dataToSend
                });

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 9]]);
      }));

      function componentDidMount() {
        return _ref.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: 'sendFiles',
    value: function sendFiles(files) {
      var formData = new FormData();
      var thisObject = this;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', _links.URL_RECORD_UPLOAD_FILE + this.props.params.recordId, true);

      xhr.onload = function (e) {
        var fileToUpload = JSON.parse(xhr.response).upload.files[0];
        fileToUpload.src = fileToUpload.src;

        var dataToSend = thisObject.state.dataToSend;
        dataToSend.featuredImage = fileToUpload.src;

        thisObject.setState({ dataToSend: dataToSend });
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
    key: 'updateRecord',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var fetch, state, prepareDataToSend, recordData;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fetch = new _fetchData2.default();
                state = this.state;


                prepareDataToSend = {
                  featuredImage: state.dataToSend.featuredImage,
                  recordName: state.dataToSend.Name,
                  media: state.recordData.data.media,
                  fields: []
                };


                prepareDataToSend.fields = (0, _keys2.default)(state.dataToSend).map(function (name, i) {
                  var temporaldata = void 0;
                  var type = void 0;

                  for (var a in state.recordData.structure.info) {
                    if (state.recordData.structure.info[a].name === name) {
                      type = state.recordData.structure.info[a].type;
                      break;
                    }
                  }

                  var data = state.dataToSend[name];

                  if (type === "rich_text") {
                    var currentContentState = data.getCurrentContent();
                    var rawContentState = (0, _draftJs.convertToRaw)(currentContentState);
                    data = (0, _stringify2.default)(rawContentState);
                  }

                  var field = { name: name, type: type, data: data };

                  return field;
                });

                _context2.prev = 4;
                _context2.next = 7;
                return fetch.setRecordData(this.props.params.recordId, prepareDataToSend);

              case 7:
                recordData = _context2.sent;

                this.setState({ submitted: true });
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2['catch'](4);

                console.error('fetching record update data > ' + _context2.t0);

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 11]]);
      }));

      function updateRecord() {
        return _ref2.apply(this, arguments);
      }

      return updateRecord;
    }()
  }, {
    key: 'toggleMultimediaAdder',
    value: function toggleMultimediaAdder() {

      this.setState({ showMediaAdder: true, previousData: {} });
    }




  }, {
    key: 'getMediaPreviewers',
    value: function getMediaPreviewers(arrayOfMedia) {
      var _this2 = this;

      if (Array.isArray(arrayOfMedia) && arrayOfMedia.length > 0) {
        return _react2.default.createElement(
          'div',
          { style: { width: "100%", height: 200, border: "1px dashed lightgrey", backgroundColor: "lightgrey" } },
          arrayOfMedia.map(function (element, i) {
            return _react2.default.createElement(_recordMediaPreviewer2.default, {
              key: i,
              media: (0, _extends3.default)({}, element, { src: _links.URL_MULTIMEDIA + element.src }),
              mediaDeleter: _this2.deleteMedia,
              mediaUpdater: _this2.updateMedia,
              index: i
            });
          })
        );
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event, index, value, name) {
      var dataToSend = this.state.dataToSend;

      if (!dataToSend) {
        dataToSend = {};
      }

      dataToSend[name] = value;

      this.setState({ dataToSend: dataToSend });
    }
  }, {
    key: 'updateMultilineData',
    value: function updateMultilineData(name, index, data) {
      var dataToSend = this.state.dataToSend;
      var recordData = this.state.recordData;



      dataToSend[name] = data;

      var foundIt = false;
      for (var a in recordData.data.fields) {

        if (recordData.data.fields[a].name === name) {
          recordData.data.fields[a].data = data;
          foundIt = true;
          break;
        }
      }

      if (!foundIt) {
        var getType = void 0;
        for (var a in recordData.structure.info) {
          if (recordData.structure.info[a].name === name) {
            getType = recordData.structure.info[a].type;
            break;
          }
        }
        recordData.data.fields.push({ name: name, data: data, type: getType });
      }

      this.setState({
        dataToSend: dataToSend,
        recordData: recordData,
        updated: Date.now()
      });
    }
  }, {
    key: 'initialiseEditor',
    value: function initialiseEditor(item, i, input) {
      var _this3 = this;

      if (!this.state.toolbarPlugins[item.name]) {
        this.state.toolbarPlugins[item.name] = (0, _draftJsInlineToolbarPlugin2.default)({
          structure: [_draftJsButtons.BoldButton, _draftJsButtons.ItalicButton, _draftJsButtons.UnderlineButton, _draftJsButtons.CodeButton, _draftJsInlineToolbarPlugin.Separator, _draftJsButtons.HeadlineOneButton, _draftJsButtons.HeadlineTwoButton, _draftJsButtons.HeadlineThreeButton, _draftJsButtons.UnorderedListButton, _draftJsButtons.OrderedListButton, _draftJsButtons.BlockquoteButton, _draftJsButtons.CodeBlockButton]
        });
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_draftJsPluginsEditor2.default, { editorState: input[i],
          onChange: function onChange(value) {
            return _this3.onChangeRichText(i, item.name, value);
          },
          plugins: [this.state.toolbarPlugins[item.name]],
          ref: function ref(element) {
            if (!_this3.editor) {
              _this3.editor = {};
            };_this3.editor[item.name] = element;
          },
          placeholder: item.name
        }),
        this.state.toolbarPlugins[item.name].InlineToolbar.prototype.render()
      );
    }
  }, {
    key: 'getExistingItem',
    value: function getExistingItem(itemList, name) {
      for (var a in itemList) {
        if (itemList[a].name == name) return itemList[a];
      }
      return { data: '' };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var style = {
        margin: 12
      };
      var input = this._input;
      var formFlexibleTemplate = [];

      if (this.state && this.state.submitted) {
        return _react2.default.createElement(
          _Card.Card,
          { style: { padding: 20 } },
          _react2.default.createElement(
            'div',
            null,
            ' ',
            _react2.default.createElement(
              'h1',
              null,
              ' New Record Submitted! '
            ),
            _react2.default.createElement(
              _reactRouter.Link,
              { to: _links.URL_VIEW_RECORD + this.props.params.recordId, target: '_blank' },
              ' ',
              _react2.default.createElement(
                'h2',
                null,
                ' View changes... '
              )
            ),
            _react2.default.createElement(
              _reactRouter.Link,
              { to: _links.URL_CONTROL_ROOM },
              ' ',
              _react2.default.createElement(
                'h2',
                null,
                ' Back to Control Room... '
              )
            )
          )
        );
      }

      if (!this.state || !this.state.recordData) {
        return _react2.default.createElement('div', null);
      }

      var recordData = this.state.recordData;

      if ((0, _keys2.default)(recordData.data).length < 1) {
        recordData.data = JSON.parse((0, _stringify2.default)(recordData.structure));
      }

      if (!recordData) {
        return _react2.default.createElement('div', null);
      }

      if (!!recordData.structure && 'info' in recordData.structure) {
        formFlexibleTemplate = recordData.structure.info.map(function (item, i) {

          var template = recordData.structure.info[i];

          var data = {};
          var dataEmpty = true;
          for (var a in recordData.data.fields) {
            if (recordData.data.fields[a].name === recordData.structure.info[i].name) {
              data = recordData.data.fields[a].data;
              dataEmpty = false;
              if (!data) {
                dataEmpty = true;
              }

            }
          }


          switch (item.type) {
            case 'multi_row':
              template = item.template;

              if (data.constructor.name != 'Array') {
                data = [];
              }

              return _react2.default.createElement(
                'div',
                { key: i },
                _react2.default.createElement(
                  'span',
                  { style: { marginRight: 15, fontWeight: "bold" } },
                  item.name + ":"
                ),
                _react2.default.createElement(_multipleRowInput.MultipleRowInput, {
                  template: template,
                  data: data,
                  updateData: function updateData(newData) {
                    return _this4.updateMultilineData(item.name, i, newData);
                  }
                })
              );

            case 'rich_text':

              if (!input[i]) {
                if (!dataEmpty) {

                  if (typeof data == "string" && data.length > 0) {
                    try {
                      input[i] = _draftJs.EditorState.createWithContent((0, _draftJs.convertFromRaw)(JSON.parse(data)));
                    } catch (e) {
                      var blocksFromHTML = (0, _draftJs.convertFromHTML)(data);
                      var state = _draftJs.ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
                      input[i] = _draftJs.EditorState.createWithContent(state);
                    }
                  } else {
                    input[i] = _draftJs.EditorState.createWithContent((0, _draftJs.convertFromRaw)(data));
                  }

                } else {
                  input[i] = _draftJs.EditorState.createEmpty();
                }
              }

              return _react2.default.createElement(
                'div',
                { key: i },
                _react2.default.createElement(
                  'span',
                  { style: { marginRight: 15, fontWeight: "bold" } },
                  item.name + ":"
                ),
                _react2.default.createElement(
                  'div',
                  { style: { marginLeft: 20, marginTop: 15, paddingBottom: 5, borderBottom: "1px solid #cccccc", maxHeight: 300, overflowY: "scroll" }, onClick: function onClick(e) {
                      return _this4.focus(item.name);
                    } },
                  _this4.initialiseEditor(item, i, input)
                )
              );

          }
          return _react2.default.createElement(
            'div',
            { key: i },
            _react2.default.createElement(
              'span',
              { style: { marginRight: 15, fontWeight: "bold" } },
              item.name + ":"
            ),
            _react2.default.createElement(_TextField2.default, { hintText: item.name, multiLine: true,
              rows: 1,
              rowsMax: 10,
              style: { width: 790 },
              defaultValue: _this4.getExistingItem(recordData.data.fields, item.name).data.replace(/<br\/>/gm, "\n") || '',
              onChange: function onChange(event, index, value) {
                return _this4.handleChange(event, value, index, item.name);
              } })
          );
        });
      }

      return _react2.default.createElement(
        _Card.Card,
        { style: { padding: 30 } },
        _react2.default.createElement(
          'style',
          null,
          "\
               .public-DraftEditorPlaceholder-inner {\
                 position: absolute;\
                 color: #aaaaaa;\
               }\
             "
        ),
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
        _react2.default.createElement(_recordAddMedia2.default, { enableEditor: this.state.showMediaAdder, recordId: this.props.params.recordId, mediaAdder: this.addMediaElement, prevData: this.state.previousData }),
        _react2.default.createElement(
          'h1',
          null,
          ' Adding/Editing  ',
          recordData.type + " / " + recordData.subtype,
          ' '
        ),
        formFlexibleTemplate,
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'span',
          { style: { fontWeight: "bolder", fontSize: 18 } },
          'Featured Photo'
        ),
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
                return _this4.submitFiles(e);
              }
            },
            'Upload'
          )
        ),
        _react2.default.createElement('img', {
          style: { maxWidth: 500, maxHeight: 300, marginTop: 5 },
          src: this.state.dataToSend.featuredImage ? _links.URL_MULTIMEDIA + this.state.dataToSend.featuredImage : _links.URL_BASE_MULTIMEDIA_IMAGES + "institution-default.jpg"
        }),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'span',
          { style: { fontWeight: "bolder", fontSize: 18 } },
          'Photos'
        ),
        _react2.default.createElement(_RaisedButton2.default, {
          label: 'Add photo',
          primary: true,
          style: style,
          onClick: function onClick() {
            return _this4.toggleMultimediaAdder();
          }
        }),
        this.getMediaPreviewers(recordData.data.media.picture),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'span',
          { style: { fontWeight: "bolder", fontSize: 18 } },
          'Audio Recordings'
        ),
        _react2.default.createElement(_RaisedButton2.default, {
          label: 'Add Audio Recording',
          primary: true,
          style: style,
          onClick: function onClick() {
            return _this4.toggleMultimediaAdder();
          }
        }),
        this.getMediaPreviewers(recordData.data.media.audio),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'span',
          { style: { fontWeight: "bolder", fontSize: 18 } },
          'Video Recordings'
        ),
        _react2.default.createElement(_RaisedButton2.default, {
          label: 'Add Video Recording',
          primary: true,
          style: style,
          onClick: function onClick() {
            return _this4.toggleMultimediaAdder();
          }
        }),
        this.getMediaPreviewers(recordData.data.media.video),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'span',
          { style: { fontWeight: "bolder", fontSize: 18 } },
          'Docs and PDFs'
        ),
        _react2.default.createElement(_RaisedButton2.default, {
          label: 'Add PDF or text document',
          primary: true,
          style: style,
          onClick: function onClick() {
            return _this4.toggleMultimediaAdder();
          }
        }),
        this.getMediaPreviewers(recordData.data.media.text),
        _react2.default.createElement(
          _Card.Card,
          { style: { marginTop: 30, textAlign: "right" } },
          _react2.default.createElement(_RaisedButton2.default, {
            label: 'Cancel',
            primary: true,
            style: style,
            href: _links.URL_CONTROL_ROOM
          }),
          _react2.default.createElement(_RaisedButton2.default, {
            label: 'Submit',
            primary: true,
            style: style,
            onClick: function onClick() {
              return _this4.updateRecord();
            }
          })
        )
      );
    }
  }]);
  return RecordEdit;
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

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RecordEdit);