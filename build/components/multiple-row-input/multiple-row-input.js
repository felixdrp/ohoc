'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _highlightOff = require('material-ui/svg-icons/action/highlight-off');

var _highlightOff2 = _interopRequireDefault(_highlightOff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MultipleRowInput = function (_Component) {
  (0, _inherits3.default)(MultipleRowInput, _Component);

  function MultipleRowInput() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MultipleRowInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MultipleRowInput.__proto__ || (0, _getPrototypeOf2.default)(MultipleRowInput)).call.apply(_ref, [this].concat(args))), _this), _this._input = {}, _this.addLine = function () {
      _this.props.updateData([].concat((0, _toConsumableArray3.default)(_this.props.data), [_this.props.template]));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MultipleRowInput, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _stringify2.default)(nextProps.data) != (0, _stringify2.default)(this.props.data);
    }
  }, {
    key: 'removeLine',
    value: function removeLine(row) {
      var spliced = [].concat((0, _toConsumableArray3.default)(this.props.data));
      spliced.splice(row, 1);

      this.props.updateData(spliced);
    }
  }, {
    key: 'updateData',
    value: function updateData() {
      var _this2 = this;

      var newData = this.props.data.map(function (row, i) {
        return row.map(function (field, j) {
          return (0, _extends3.default)({}, field, { data: _this2._input['_' + i + j].input.value });
        });
      });
      this.props.updateData(newData);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var props = this.props;
      var multiRows = [];
      var input = this._input;

      if (props.data.length > 0) {
        multiRows = props.data.map(function (row, i) {
          return _react2.default.createElement(
            'div',
            { key: i },
            row.map(function (field, j) {
              var value = field.data || '';
              return _react2.default.createElement(
                'span',
                { key: j, style: { marginRight: 15 } },
                _react2.default.createElement(
                  'span',
                  { style: { marginRight: 15, fontWeight: "bold", fontSize: '0.8em' } },
                  field.name + ":"
                ),
                _react2.default.createElement(_TextField2.default, {
                  ref: function ref(_ref2) {
                    input['_' + i + j] = _ref2;
                  },
                  name: 'field_' + i + field.name,
                  hintText: field.name,
                  multiLine: false,
                  rows: 1,
                  style: { fontSize: '0.8em' },
                  value: value,
                  onChange: function onChange(event, index, value) {
                    return _this3.updateData();
                  }
                })
              );
            }),
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(
                _IconButton2.default,
                {
                  tooltip: 'Remove row',
                  iconStyle: { color: 'red' },
                  onClick: function onClick() {
                    _this3.removeLine(i);
                  }
                },
                _react2.default.createElement(_highlightOff2.default, null)
              )
            )
          );
        });
      }

      return _react2.default.createElement(
        'div',
        null,
        multiRows,
        _react2.default.createElement(_RaisedButton2.default, {
          label: 'Add line',
          primary: true,
          style: {},
          onClick: function onClick() {
            return _this3.addLine();
          }
        })
      );
    }
  }]);
  return MultipleRowInput;
}(_react.Component);

MultipleRowInput.propTypes = {
  template: _react2.default.PropTypes.array,
  data: _react2.default.PropTypes.array,
  updateData: _react2.default.PropTypes.func
};
exports.default = MultipleRowInput;