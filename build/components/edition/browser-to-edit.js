'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

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

var _delete = require('material-ui/svg-icons/action/delete');

var _delete2 = _interopRequireDefault(_delete);

var _fetchData = require('../../network/fetch-data');

var _fetchData2 = _interopRequireDefault(_fetchData);

var _links = require('../../links');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrowserToEdit = function (_Component) {
  (0, _inherits3.default)(BrowserToEdit, _Component);

  function BrowserToEdit() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, BrowserToEdit);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BrowserToEdit.__proto__ || (0, _getPrototypeOf2.default)(BrowserToEdit)).call.apply(_ref, [this].concat(args))), _this), _this.state = { over: null }, _this.overHandler = function (recordId) {
      _this.setState({ over: recordId });
    }, _this.leaveHandler = function (recordId) {
      _this.setState({ over: null });
    }, _this.deleteRecord = function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(recordId) {
        var fetch, deleteRecord;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fetch = new _fetchData2.default();
                deleteRecord = void 0;
                _context.prev = 2;
                _context.next = 5;
                return fetch.deleteRecord(recordId);

              case 5:
                deleteRecord = _context.sent;


                _this.setState({
                  over: null
                });

                _context.next = 9;
                return _this.loadRecords();

              case 9:
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](2);

                console.error('Delete record error > ' + _context.t0);

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2, [[2, 11]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.loadRecords = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var fetch, templateList, allRecordsList;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              fetch = new _fetchData2.default();

              templateList = void 0, allRecordsList = void 0;
              _context2.prev = 2;
              _context2.next = 5;
              return fetch.templateListGet();

            case 5:
              templateList = _context2.sent;
              _context2.next = 8;
              return fetch.getAllRecords();

            case 8:
              allRecordsList = _context2.sent;


              _this.setState({
                templateList: templateList.templateList,
                allRecordsList: allRecordsList.recordsAllList
              });
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2['catch'](2);

              console.error('fetching record data > ' + _context2.t0);

            case 15:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[2, 12]]);
    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(BrowserToEdit, [{
    key: 'componentDidMount',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.loadRecords();

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function componentDidMount() {
        return _ref4.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: 'createRecord',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(template, subtemplate) {
        var newRecordId, fetch;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(!template || !subtemplate)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return');

              case 2:
                newRecordId = void 0;
                fetch = new _fetchData2.default();

                _context4.next = 6;
                return fetch.createRecord({
                  template: template,
                  subtemplate: subtemplate
                });

              case 6:
                newRecordId = _context4.sent;


                this.props.editNewRecord(newRecordId.recordId);

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function createRecord(_x2, _x3) {
        return _ref5.apply(this, arguments);
      }

      return createRecord;
    }()
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var style = {
        margin: 12
      };

      var state = this.state;

      var baseAvatarImage = _links.URL_BASE_MULTIMEDIA_IMAGES + '/institution-default.jpg';

      if (!this.state || !this.state.allRecordsList) {
        return _react2.default.createElement('div', null);
      }


      return _react2.default.createElement(
        _Card.Card,
        { style: { paddingBottom: 20 } },
        _react2.default.createElement(
          _Card.CardTitle,
          { style: { marginLeft: 50 } },
          ' ',
          _react2.default.createElement(
            'h1',
            null,
            ' ',
            this.props.params.categoryId,
            ' '
          ),
          ' '
        ),
        _react2.default.createElement(
          _Card.Card,
          { style: { marginLeft: 50, marginRight: 50 } },
          _react2.default.createElement(
            _Card.CardText,
            null,
            (0, _keys2.default)(state.templateList).map(function (group, g) {
              return _react2.default.createElement(
                _List.List,
                { key: g },
                _react2.default.createElement(
                  _Subheader2.default,
                  { style: { fontWeight: "bolder" } },
                  group
                ),
                (0, _keys2.default)(state.templateList[group]).map(function (subType, j) {
                  return _react2.default.createElement(
                    'div',
                    {
                      key: j,
                      style: {
                        marginLeft: 18
                      }
                    },
                    _react2.default.createElement(
                      'h5',
                      {
                        style: {
                          color: 'rgba(51, 51, 51, 0.6)',
                          fontWeight: "bolder",
                          marginTop: 0,
                          marginBottom: 5,
                          marginLeft: 18
                        }
                      },
                      state.templateList[group][subType],
                      _react2.default.createElement(_FlatButton2.default, {
                        label: 'Add record',
                        primary: true,
                        style: {
                          marginLeft: 10
                        },
                        onClick: function onClick() {
                          return _this3.createRecord(group, state.templateList[group][subType]);
                        }
                      })
                    ),

                    state.allRecordsList.filter(function (entry) {
                      return entry.type == group && entry.subtype == state.templateList[group][subType];
                    }).map(function (entry, i) {
                      return _react2.default.createElement(
                        _reactRouter.Link,
                        {
                          to: _links.URL_CONTROL_ROOM_EDIT_RECORD + entry.id,
                          key: i,
                          style: { textDecoration: 'none' },
                          onMouseOver: function onMouseOver() {
                            return _this3.overHandler(entry.id);
                          },
                          onMouseLeave: function onMouseLeave() {
                            return _this3.leaveHandler(entry.id);
                          }
                        },
                        _react2.default.createElement(
                          _List.ListItem,
                          {
                            primaryText: entry.data.recordName,
                            leftAvatar: _react2.default.createElement(_Avatar2.default, {
                              src: entry.data.featuredImage ? _links.URL_MULTIMEDIA + entry.data.featuredImage : baseAvatarImage
                            }),
                            rightIcon: _react2.default.createElement(_navigateNext2.default, null)
                          },
                          state.over == entry.id ? _react2.default.createElement(
                            'span',
                            {
                              style: { float: 'right' },
                              onClick: function onClick(event) {
                                console.log('delete');
                                event.preventDefault();
                                _this3.deleteRecord(entry.id);
                              }
                            },
                            _react2.default.createElement(_delete2.default, null)
                          ) : ''
                        )
                      );
                    })
                  );
                })
              );
            })
          )
        )
      );
    }
  }]);
  return BrowserToEdit;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    editNewRecord: function editNewRecord(newRecordId) {
      dispatch((0, _reactRouterRedux.push)(_links.URL_CONTROL_ROOM_EDIT_RECORD + newRecordId));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BrowserToEdit);