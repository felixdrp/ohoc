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

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _List = require('material-ui/List');

var _Subheader = require('material-ui/Subheader');

var _Subheader2 = _interopRequireDefault(_Subheader);

var _navigateNext = require('material-ui/svg-icons/image/navigate-next');

var _navigateNext2 = _interopRequireDefault(_navigateNext);

var _gridview = require('./gridview');

var _gridview2 = _interopRequireDefault(_gridview);

var _listview = require('./listview');

var _listview2 = _interopRequireDefault(_listview);

var _stringTools = require('../stringTools');

var _stringTools2 = _interopRequireDefault(_stringTools);

var _fetchData = require('../../network/fetch-data');

var _fetchData2 = _interopRequireDefault(_fetchData);

var _links = require('../../links');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubCategoriesView = function (_Component) {
  (0, _inherits3.default)(SubCategoriesView, _Component);

  function SubCategoriesView() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SubCategoriesView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SubCategoriesView.__proto__ || (0, _getPrototypeOf2.default)(SubCategoriesView)).call.apply(_ref, [this].concat(args))), _this), _this.entriesToSubtypeGroups = function (list) {

      var groupedEntries = {};
      for (var entry in list) {
        entry = list[entry];
        if (!groupedEntries[entry.subtype]) {
          groupedEntries[entry.subtype] = [];
        }

        groupedEntries[entry.subtype].push(entry);
      }

      return groupedEntries;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SubCategoriesView, [{
    key: 'componentDidMount',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var fetch, categoriesList;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fetch = new _fetchData2.default();

                categoriesList = void 0;
                _context.prev = 2;
                _context.next = 5;
                return fetch.getRecordsByType(this.props.params.categoryId);

              case 5:
                categoriesList = _context.sent;

                this.setState({ categoriesList: categoriesList });
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

      if (!this.state || !this.state.categoriesList) {
        return _react2.default.createElement('div', null);
      }

      var list = this.state.categoriesList.recordsByType;

      var entriesBySubtype = this.entriesToSubtypeGroups(list);
      var selectedSubCategory = entriesBySubtype[this.props.params.subcategoryId];

      if (!selectedSubCategory) {
        return _react2.default.createElement('div', null);
      }

      var showAsGrid = true;

      return _react2.default.createElement(
        _Card.Card,
        { style: { paddingBottom: 30, minHeight: 600 } },
        _react2.default.createElement(
          _Card.CardTitle,
          { style: { marginLeft: 40 } },
          ' ',
          _react2.default.createElement(
            'h1',
            null,
            ' ',
            (0, _stringTools2.default)(this.props.params.subcategoryId),
            ' '
          ),
          ' '
        ),
        _react2.default.createElement(
          _Card.Card,
          { style: { marginLeft: 50, marginRight: 50, padding: 5 } },
          _react2.default.createElement(_gridview2.default, { subcategoryId: this.props.params.subcategoryId, entries: selectedSubCategory })
        )
      );
    }
  }]);
  return SubCategoriesView;
}(_react.Component);

exports.default = SubCategoriesView;