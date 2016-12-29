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

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _fetchData = require('../../network/fetch-data');

var _fetchData2 = _interopRequireDefault(_fetchData);

var _links = require('../../links');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecordCreate = function (_Component) {
  (0, _inherits3.default)(RecordCreate, _Component);

  function RecordCreate(props) {
    (0, _classCallCheck3.default)(this, RecordCreate);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RecordCreate.__proto__ || (0, _getPrototypeOf2.default)(RecordCreate)).call(this, props));

    _this.handleChangeCategorie = function (event, index, value) {
      return _this.setState({ template: value });
    };

    _this.handleChangeSubcategorie = function (event, index, value) {
      return _this.setState({ subtemplate: value });
    };

    _this.state = {
      template: '',
      subtemplate: ''
    };
    return _this;
  }

  (0, _createClass3.default)(RecordCreate, [{
    key: 'createRecord',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var state, newRecordId, fetch;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                state = this.state;

                if (state.template) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return');

              case 3:
                newRecordId = void 0;
                fetch = new _fetchData2.default();

                _context.next = 7;
                return fetch.createRecord({
                  template: state.template,
                  subtemplate: state.subtemplate
                });

              case 7:
                newRecordId = _context.sent;


                this.props.editNewRecord(newRecordId.recordId);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createRecord() {
        return _ref.apply(this, arguments);
      }

      return createRecord;
    }()
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = {
        margin: 12
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Add Record'
        ),
        _react2.default.createElement(
          _SelectField2.default,
          {
            floatingLabelText: 'Categories',
            hintText: 'Please, select a template',
            errorText: '',
            errorStyle: {},
            value: this.state.template,
            onChange: this.handleChangeCategorie
          },
          this.props.templateList && (0, _keys2.default)(this.props.templateList).map(function (element, index) {
            return _react2.default.createElement(_MenuItem2.default, { key: index, value: element, primaryText: element });
          })
        ),
        !!this.state.template && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _SelectField2.default,
            {
              floatingLabelText: 'Subcategories',
              hintText: 'Please, select a ',
              errorText: '',
              errorStyle: {},
              value: this.state.subtemplate,
              onChange: this.handleChangeSubcategorie
            },
            this.props.templateList[this.state.template].map(function (element, index) {
              return _react2.default.createElement(_MenuItem2.default, { key: index, value: element, primaryText: element });
            })
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_RaisedButton2.default, {
            label: 'Add Record',
            primary: true,
            style: style,
            disabled: !(!!this.state.template && !!this.state.subtemplate),
            onClick: function onClick() {
              return _this2.createRecord();
            }
          })
        )
      );
    }
  }]);
  return RecordCreate;
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
      dispatch((0, _reactRouterRedux.push)(_links.URL_CONTROL_ROOM_EDIT_RECORD + newRecordId));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RecordCreate);