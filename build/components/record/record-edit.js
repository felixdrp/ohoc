'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _stringTools = require('../stringTools');

var _stringTools2 = _interopRequireDefault(_stringTools);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Card = require('material-ui/Card');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _recordAddMedia = require('./record-addMedia');

var _recordAddMedia2 = _interopRequireDefault(_recordAddMedia);

var _recordMediaPreviewer = require('./record-mediaPreviewer');

var _recordMediaPreviewer2 = _interopRequireDefault(_recordMediaPreviewer);

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

      var currentRecord = _this.state.recordData.recordById[0];
      var allowedTypes = ["image", "audio", "video", "text"];
      var selectedType = type.split("/")[0];

      if (allowedTypes.includes(selectedType)) {
        selectedType = selectedType == "image" ? "picture" : selectedType;
        currentRecord.data.media[selectedType].splice(i, 1);
      }

      var newRecordData = _this.state.recordData;
      newRecordData.recordById[0] = currentRecord;
      _this.setState({ recordData: newRecordData });
    };

    _this.addMediaElement = function (mediaObject) {

      _this.setState({ showMediaAdder: false });

      if (!mediaObject) {
        return;
      }

      var currentRecord = _this.state.recordData.recordById[0];

      if (Array.isArray(currentRecord.data.media)) {
        currentRecord.data.media = { "text": [], "audio": [], "video": [], "picture": [] };
      }

      var allowedTypes = ["image", "audio", "video", "text", "application"];
      var selectedType = mediaObject.type.split("/")[0];

      if (allowedTypes.includes(selectedType)) {
        selectedType = selectedType == "image" ? "picture" : selectedType;
        selectedType = selectedType == "application" ? "text" : selectedType;
        var i = currentRecord.data.media[selectedType].findIndex(function (element) {
          return element.title == mediaObject.title && element.src == mediaObject.src;
        });
        if (i > -1) {
          currentRecord.data.media[selectedType].splice(i, 1);
        }
        currentRecord.data.media[selectedType].push(mediaObject);
      }

      var newRecordData = _this.state.recordData;
      newRecordData.recordById[0] = currentRecord;
      _this.setState({ recordData: newRecordData });
    };

    _this.getPreviewer = function (elem, style) {
      if (elem.src) if (elem.type.includes("image/")) {
        return _react2.default.createElement('img', { style: style, src: elem.src });
      } else if (elem.type.includes("audio/")) {
        return _react2.default.createElement('audio', { style: { width: "95%" }, controls: true, src: elem.src });
      } else if (elem.type.includes("video/")) {
        return _react2.default.createElement('video', { style: { width: "95%" }, controls: true, src: elem.src });
      } else {
        return _react2.default.createElement(
          'a',
          { style: { width: "95%" }, href: elem.src, target: "_blank" },
          elem.title
        );
      }
      return _react2.default.createElement('span', null);
    };

    _this.state = {};

    _this._input = {};
    return _this;
  }

  (0, _createClass3.default)(RecordEdit, [{
    key: 'componentDidMount',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var fetch, recordData, currentRecord, dataToSend, fieldKey, infoField, itemList, a;
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
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](2);

                console.error('fetching record data > ' + _context.t0);

              case 11:

                debugger;

                currentRecord = recordData.recordById[0];
                dataToSend = {};


                if ((0, _keys2.default)(currentRecord.data).length < 1) {
                  currentRecord.data.fields = [];

                  for (fieldKey in currentRecord.structure.info) {
                    infoField = currentRecord.structure.info[fieldKey];

                    currentRecord.data.fields.push({ data: "", type: infoField.type, name: infoField.name });
                  }

                  currentRecord.data.media = JSON.parse((0, _stringify2.default)(currentRecord.structure.media));
                } else {
                  itemList = currentRecord.data.fields;

                  for (a in itemList) {
                    dataToSend[itemList[a].name] = itemList[a].data.replace("<br/>", "\n");
                  }
                }

                recordData.recordById[0] = currentRecord;

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
        }, _callee, this, [[2, 8]]);
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
      xhr.open('POST', '/api/record/upload/' + this.props.params.recordId, true);

      xhr.onload = function (e) {
        var fileToUpload = JSON.parse(xhr.response).upload.files[0];
        fileToUpload.src = "http://localhost:3001/multimedia/" + fileToUpload.src;

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
        var fetch, dataToSend, k, key, fieldData, recordData;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fetch = new _fetchData2.default();


                dataToSend = {
                  featuredImage: this.state.dataToSend.featuredImage,
                  recordName: this.state.dataToSend.name,
                  media: {},
                  fields: []
                };


                for (k in (0, _keys2.default)(this.state.dataToSend)) {
                  key = (0, _keys2.default)(this.state.dataToSend)[k];
                  fieldData = this.state.dataToSend[key].replace(/\n/gm, "<br/>");


                  dataToSend.fields.push({ name: key, data: fieldData, type: "text" });
                }

                dataToSend.media = this.state.recordData.recordById[0].data.media;

                _context2.prev = 4;
                _context2.next = 7;
                return fetch.setRecordData(this.props.params.recordId, dataToSend);

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

      this.setState({ showMediaAdder: true });
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
            return _react2.default.createElement(_recordMediaPreviewer2.default, { key: i, media: element, mediaPreviewer: _this2.getPreviewer, mediaDeleter: _this2.deleteMedia, index: i });
          })
        );
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event, index, value, name) {
      var currentData = this.state.dataToSend;

      if (!currentData) {
        currentData = {};
      }

      currentData[name] = value;

      this.setState({ dataToSend: currentData });
    }
  }, {
    key: 'getExistingItem',
    value: function getExistingItem(itemList, name) {
      for (var a in itemList) {
        if (itemList[a].name == name) return itemList[a];
      }
      return {};
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var style = {
        margin: 12
      };

      if (this.state && this.state.submitted) {
        return _react2.default.createElement(
          'div',
          null,
          ' ',
          _react2.default.createElement(
            'h1',
            null,
            ' New Record Submitted! '
          ),
          ' '
        );
      }

      if (!this.state || !this.state.recordData) {
        return _react2.default.createElement('div', null);
      }

      console.log((0, _stringify2.default)(this.state));

      var currentRecord = this.state.recordData.recordById[0];

      if ((0, _keys2.default)(currentRecord.data).length < 1) {
        currentRecord.data = JSON.parse((0, _stringify2.default)(currentRecord.structure));
      }

      if (!currentRecord) {
        return _react2.default.createElement('div', null);
      }

      var input = this._input;

      return _react2.default.createElement(
        _Card.Card,
        { style: { padding: 30 } },
        this.state.showMediaAdder ? _react2.default.createElement(_recordAddMedia2.default, { recordId: this.props.params.recordId, mediaAdder: this.addMediaElement, mediaPreviewer: this.getPreviewer }) : _react2.default.createElement('div', null),
        _react2.default.createElement(
          'h1',
          null,
          ' Adding new  ',
          currentRecord.type + " / " + currentRecord.subtype,
          ' '
        ),
        !!currentRecord.structure && 'info' in currentRecord.structure && currentRecord.structure.info.map(function (item, i) {
          return _react2.default.createElement(
            'div',
            { key: i },
            ' ',
            _react2.default.createElement(
              'span',
              { style: { marginRight: 15, fontWeight: "bold" } },
              (0, _stringTools2.default)(item.name) + ":"
            ),
            _react2.default.createElement(_TextField2.default, { hintText: item.name, multiLine: true,
              rows: 1,
              rowsMax: 10,
              style: { width: 790 },
              defaultValue: _this3.getExistingItem(currentRecord.data.fields, item.name).data.replace(/<br\/>/gm, "\n") || "", onChange: function onChange(event, index, value) {
                return _this3.handleChange(event, value, index, item.name);
              } })
          );
        }),
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
                return _this3.submitFiles(e);
              }
            },
            'Upload'
          )
        ),
        _react2.default.createElement('img', { style: { maxWidth: 500, maxHeight: 300, marginTop: 5 }, src: this.state.dataToSend.featuredImage ? this.state.dataToSend.featuredImage : "http://localhost:3001/images/institution-default.jpg" }),
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
            return _this3.toggleMultimediaAdder();
          }
        }),
        this.getMediaPreviewers(currentRecord.data.media.picture),
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
            return _this3.toggleMultimediaAdder();
          }
        }),
        this.getMediaPreviewers(currentRecord.data.media.audio, this.getPreviewer),
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
            return _this3.toggleMultimediaAdder();
          }
        }),
        this.getMediaPreviewers(currentRecord.data.media.video, this.getPreviewer),
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
            return _this3.toggleMultimediaAdder();
          }
        }),
        this.getMediaPreviewers(currentRecord.data.media.text, this.getPreviewer),
        _react2.default.createElement(
          _Card.Card,
          { style: { marginTop: 30, textAlign: "right" } },
          _react2.default.createElement(_RaisedButton2.default, {
            label: 'Cancel',
            primary: true,
            style: style,
            href: 'http://localhost:3000/controlRoom/record/create'
          }),
          _react2.default.createElement(_RaisedButton2.default, {
            label: 'Submit',
            primary: true,
            style: style,
            onClick: function onClick() {
              return _this3.updateRecord();
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
      dispatch(push('/controlRoom/record/edit/' + newRecordId));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RecordEdit);