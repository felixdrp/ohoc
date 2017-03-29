'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _fetchData = require('../../network/fetch-data');

var _fetchData2 = _interopRequireDefault(_fetchData);

var _nukaCarousel = require('nuka-carousel');

var _nukaCarousel2 = _interopRequireDefault(_nukaCarousel);

var _recordViewMediaElement = require('./record-view-mediaElement');

var _recordViewMediaElement2 = _interopRequireDefault(_recordViewMediaElement);

var _draftJs = require('draft-js');

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _reactMeasure = require('react-measure');

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

var _reactImageLightbox = require('react-image-lightbox');

var _reactImageLightbox2 = _interopRequireDefault(_reactImageLightbox);

var _reactPreload = require('react-preload');

var _reactPreload2 = _interopRequireDefault(_reactPreload);

var _halogen = require('halogen');

var _halogen2 = _interopRequireDefault(_halogen);

var _links = require('../../links');

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

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RecordView.__proto__ || (0, _getPrototypeOf2.default)(RecordView)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dimensions: {
        width: -1,
        height: -1
      }
    }, _this.getMediaPreviewers = function (arrayOfMedia, type) {
      if (Array.isArray(arrayOfMedia) && arrayOfMedia.length > 0) {

        var allImages = [];

        arrayOfMedia.map(function (element, i) {
          return allImages.push(_react2.default.createElement(
            'div',
            { key: i, style: { width: "100%", height: type == "picture" ? 310 : "auto", textAlign: "center" } },
            _react2.default.createElement(_recordViewMediaElement2.default, {
              key: i,
              style: { maxHeight: 320, maxWidth: 400, minHeight: type == "picture" ? 310 : "auto", marginRight: 10 },
              media: (0, _extends3.default)({}, element, { src: _links.URL_MULTIMEDIA + element.src }),
              type: type
            })
          ));
        });

        var commonStyle = { marginBottom: 5 };

        if (type == "audio") {
          return allImages.map(function (element, i) {
            return _react2.default.createElement(
              'span',
              { key: i, style: (0, _extends3.default)({}, commonStyle, { width: 400 }) },
              element
            );
          });
        } else {
          return _react2.default.createElement(
            'div',
            { style: (0, _extends3.default)({}, commonStyle, { width: 390, minHeight: type == "picture" ? 310 : "auto", marginTop: 10, padding: 5, border: "1px dashed lightgrey", backgroundColor: "#e8e8e8" }) },
            _react2.default.createElement(
              _nukaCarousel2.default,
              null,
              allImages
            )
          );
        }
      }

      return _react2.default.createElement('div', null);
    }, _this.sectionTitle = function (title) {
      return _react2.default.createElement(
        'span',
        { style: { fontWeight: "bolder", fontSize: 20 } },
        title
      );
    }, _this.richTextToComponent = function (textStateFromDB) {
      var componentToReturn;
      try {
        var prevContentState = JSON.parse(textStateFromDB);
        if (prevContentState.blocks && prevContentState.blocks[0] && prevContentState.blocks[0].text.length == 0) {
          return _react2.default.createElement('div', null);
        }
        componentToReturn = _draftJs.EditorState.createWithContent((0, _draftJs.convertFromRaw)(prevContentState));
        componentToReturn = _react2.default.createElement(_draftJsPluginsEditor2.default, { readOnly: true, editorState: componentToReturn, onChange: function onChange(value) {
            return null;
          } });
      } catch (e) {
        componentToReturn = _react2.default.createElement('div', { style: { marginLeft: 10 }, dangerouslySetInnerHTML: { __html: textStateFromDB } });
      }
      return componentToReturn;
    }, _this.prepareLine = function (name, title, data) {

      switch (name.toLowerCase()) {
        case 'featuredimage':
          return _react2.default.createElement('div', null);
        case 'name':
          return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'h3',
              { style: { fontSize: 18, fontWeight: 500 } },
              data
            )
          );
        default:
          return _react2.default.createElement(
            'div',
            null,
            title,
            _react2.default.createElement(
              'span',
              { style: { marginLeft: 0 } },
              data
            )
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


                this.setState({ recordData: recordData.recordById[0] });
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
      var _this2 = this;

      var style = {
        margin: 12
      };

      if (!this.state || !this.state.recordData) {
        return _react2.default.createElement('div', null);
      }

      var baseImage = _links.URL_BASE_MULTIMEDIA_IMAGES + '/institution-default.jpg'; 

      var recordData = this.state.recordData;

      var copyrightNotice = "";

      for (var f in recordData.data.fields) {

        if (recordData.data.fields[f].name === "featured copyright notice") {
          copyrightNotice = recordData.data.fields[f].data;
          break;
        }
      }

      var fieldsFlex = recordData.structure.info.map(function (entry, i) {

        for (var a in recordData.data.fields) {
          if (recordData.data.fields[a].name == entry.name) {
            entry = recordData.data.fields[a];
          }
        }

        var multiRows = void 0;

        var fieldsToHide = ["Biography", "Name", ""];

        var title = fieldsToHide.includes(entry.name) ? "" : _react2.default.createElement(
          'h3',
          { style: { fontSize: 17, fontWeight: 500 } },
          entry.name == 'clerks' ? "Clerks" : entry.name
        );

        if (!entry.data || entry.name == "featured copyright notice") {
          return _react2.default.createElement('div', { key: i });
        }

        switch (entry.type) {
          case 'multi_row':

            if (entry.data === "") {
              entry.data = [];
            }

            if (typeof entry.data === 'string') {
              return _react2.default.createElement(
                'span',
                null,
                ' ',
                entry.data,
                ' '
              );
            }

            multiRows = entry.data.map(function (row, rowIndex) {
              var rowProcessed = row.map(function (cell, j) {
                var styleBasic = {
                  marginRight: 5
                };

                switch (cell.name.toLowerCase()) {
                  case 'name':
                    return _react2.default.createElement(
                      'span',
                      { key: j, style: (0, _extends3.default)({}, styleBasic, { fontStyle: "italic" }) },
                      cell.data
                    );
                  case 'date':
                    return _react2.default.createElement(
                      'span',
                      { key: j, style: (0, _extends3.default)({}, styleBasic) },
                      cell.data
                    );
                  case 'reference':
                    return _react2.default.createElement(
                      'span',
                      { key: j, style: (0, _extends3.default)({}, styleBasic) },
                      cell.data
                    );
                  case 'autor':
                    return _react2.default.createElement(
                      'span',
                      { key: j, style: (0, _extends3.default)({}, styleBasic) },
                      cell.data
                    );
                  case 'title':
                    return _react2.default.createElement(
                      'span',
                      { key: j, style: (0, _extends3.default)({}, styleBasic, { fontStyle: "italic" }) },
                      cell.data
                    );
                  case 'publication info':
                    return _react2.default.createElement(
                      'span',
                      { key: j, style: (0, _extends3.default)({}, styleBasic) },
                      cell.data
                    );

                  default:
                    return _react2.default.createElement(
                      'span',
                      { key: j, style: (0, _extends3.default)({}, styleBasic) },
                      cell.data
                    );
                }
              });

              return _react2.default.createElement(
                'div',
                { style: { marginLeft: 5 }, key: rowIndex },
                rowProcessed
              );
            });

            return _react2.default.createElement(
              'div',
              { key: i },
              title,
              _react2.default.createElement(
                'div',
                null,
                multiRows
              )
            );

          case 'rich_text':
            return _react2.default.createElement(
              'div',
              { key: i },
              title,
              _this2.richTextToComponent(entry.data)
            );

          default:
            return _react2.default.createElement(
              'div',
              { key: i },
              _this2.prepareLine(entry.name, title, entry.data)
            );
        }
      });

      var allImageUrls = [];

      recordData.data.media.picture.map(function (element, i) {
        return allImageUrls.push(_links.URL_MULTIMEDIA + element.src);
      });

      var loadingIndicator = _react2.default.createElement(_halogen2.default.MoonLoader, { color: "blue" });

      return _react2.default.createElement(
        _Card.Card,
        { style: { padding: 30 } },
        this.state.isOpen && _react2.default.createElement(_reactImageLightbox2.default, {
          mainSrc: recordData.data.featuredImage ? _links.URL_MULTIMEDIA + recordData.data.featuredImage : baseImage

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
          imageCaption: _react2.default.createElement(_Card.CardTitle, { title: copyrightNotice, style: { margin: 0, padding: 0, height: 40 }, titleStyle: { fontSize: "1.5em", lineHeight: 1, padding: 5, color: "white" } })
        }),
        _react2.default.createElement(
          'style',
          null,
          "\
                 .public-DraftEditor-content div{\
                   word-wrap:normal;\
                 }\
               "
        ),
        _react2.default.createElement(
          'span',
          { style: { width: "100%", display: "inline-block", verticalAlign: "top" } },
          _react2.default.createElement(
            'span',
            { style: { maxHeight: 300, width: 350, maxWidth: 350, display: "inline-block", verticalAlign: "top", float: "left", margin: 5, marginRight: 10, textAlign: "center" }, onClick: function onClick() {
                return _this2.setState({ isOpen: true });
              } },
            _react2.default.createElement(
              _Card.Card,
              {
                style: { maxWidth: 345, border: "1px solid black" },
                src: recordData.data.featuredImage ? _links.URL_MULTIMEDIA + recordData.data.featuredImage : baseImage

              },
              _react2.default.createElement(
                _Card.CardMedia,
                {
                  overlay: _react2.default.createElement(_Card.CardTitle, { title: copyrightNotice, style: { margin: 0, padding: 0, height: 20 }, titleStyle: { fontSize: 10, lineHeight: 1, padding: 0 } })
                },
                _react2.default.createElement(
                  'span',
                  { style: { width: 345, height: 250 } },
                  _react2.default.createElement('img', { style: { maxHeight: 250, maxWidth: 343 }, src: recordData.data.featuredImage ? _links.URL_MULTIMEDIA + recordData.data.featuredImage : baseImage })
                )
              )
            )
          ),
          _react2.default.createElement(
            'span',
            { style: { maxWidth: "50%", display: "inline-block", verticalAlign: "top", float: "right", marginLeft: 20, marginBottom: 20 } },
            _react2.default.createElement(
              _reactPreload2.default,
              {
                loadingIndicator: loadingIndicator,
                images: allImageUrls,
                autoResolveDelay: 3000,
                onError: this._handleImageLoadError,
                onSuccess: function onSuccess() {
                  return _this2.setState({ imagesReady: true });
                },
                resolveOnError: true,
                mountChildren: true
              },
              this.getMediaPreviewers(recordData.data.media.picture, "picture")
            ),
            _react2.default.createElement(
              'span',
              null,
              this.getMediaPreviewers(recordData.data.media.audio, "audio")
            ),
            _react2.default.createElement(
              'span',
              null,
              this.getMediaPreviewers(recordData.data.media.video, "video")
            ),
            _react2.default.createElement(
              'span',
              null,
              this.getMediaPreviewers(recordData.data.media.text, "text")
            )
          ),
          _react2.default.createElement(
            _reactMeasure2.default,
            {
              onMeasure: function onMeasure(dimensions) {
                _this2.setState({ dimensions: dimensions });
              }
            },
            _react2.default.createElement(
              'div',
              { style: {
                  paddingLeft: this.state.dimensions.width < 600 + 450 ? 0 : 365,
                  marginTop: this.state.dimensions.width > 600 + 450 ? 0 : 290,
                  wordWrap: "normal" } },
              fieldsFlex
            )
          )
        )
      );
    }
  }]);
  return RecordView;
}(_react.Component);

exports.default = RecordView;