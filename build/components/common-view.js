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

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _actions = require('../actions/actions');

var _fetchData = require('../network/fetch-data');

var _fetchData2 = _interopRequireDefault(_fetchData);

var _Card = require('material-ui/Card');

var _links = require('../links');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommonView = function (_Component) {
  (0, _inherits3.default)(CommonView, _Component);

  function CommonView() {
    (0, _classCallCheck3.default)(this, CommonView);
    return (0, _possibleConstructorReturn3.default)(this, (CommonView.__proto__ || (0, _getPrototypeOf2.default)(CommonView)).apply(this, arguments));
  }

  (0, _createClass3.default)(CommonView, [{
    key: 'componentWillMount',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var fetch;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fetch = new _fetchData2.default();

                if (!this.props.templateList) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return');

              case 3:
                _context.t0 = this.props;
                _context.next = 6;
                return fetch.templateListGet();

              case 6:
                _context.t1 = _context.sent;

                _context.t0.setTemplateList.call(_context.t0, _context.t1);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentWillMount() {
        return _ref.apply(this, arguments);
      }

      return componentWillMount;
    }()
  }, {
    key: 'render',
    value: function render() {
      var logoStyle = { height: 70, marginTop: 15, marginLeft: 5 };

      return _react2.default.createElement(
        'div',
        { id: 'CommonView', style: { marginLeft: "8%", marginTop: 20, marginRight: "8%", minWidth: 1200 } },
        _react2.default.createElement(
          _Card.Card,
          { style: { height: 130, marginBottom: 10, paddingTop: 15, paddingLeft: 20 } },
          _react2.default.createElement('img', { src: 'http://www.create.ac.uk/wp-content/uploads/logos/create_primary_logo_160.jpg', style: logoStyle }),
          _react2.default.createElement('img', { src: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/University_of_Kent_logo.svg/1280px-University_of_Kent_logo.svg.png', style: logoStyle }),
          _react2.default.createElement('img', { src: 'http://www.gla.ac.uk/media/media_434161_en.jpg', style: logoStyle }),
          _react2.default.createElement('img', { src: 'http://www.cipil.law.cam.ac.uk/sites/www.law.cam.ac.uk/files/images/www.cipil.law.cam.ac.uk/legacy/images/logo_cipil_3.gif', style: logoStyle }),
          _react2.default.createElement(
            'span',
            { style: { float: "right" } },
            _react2.default.createElement(
              'h1',
              { style: { margin: "0 0 0 0", marginRight: 25, marginTop: 5 } },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: _links.URL_BASE, style: { textDecoration: 'none' } },
                _react2.default.createElement(
                  'span',
                  { style: { color: "black" } },
                  'Intellectual Property'
                ),
                ' ',
                _react2.default.createElement('br', null),
                ' ',
                _react2.default.createElement(
                  'span',
                  { style: { color: "#3399ff" } },
                  'Oral History Project'
                )
              )
            )
          )
        ),
        this.props.children
      );
    }
  }]);
  return CommonView;
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
    setTemplateList: function setTemplateList(templateList) {
      dispatch((0, _actions.templateListSet)(templateList));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CommonView);