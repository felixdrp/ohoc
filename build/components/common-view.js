'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

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
  }]);

  function CommonView() {
    (0, _classCallCheck3.default)(this, CommonView);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CommonView.__proto__ || (0, _getPrototypeOf2.default)(CommonView)).call(this));

    _this.state = {
      isAMobile: navigator.userAgent.indexOf('Mobile') > -1 ? true : false,
      backColor: "#f2f2f2"
    };
    return _this;
  }

  (0, _createClass3.default)(CommonView, [{
    key: 'render',
    value: function render() {
      var logoStyle = { height: 50, marginTop: 10, marginLeft: 5 };

      var colors = ["#a9b3bf", "#85aad6", "#bd9d6d", "#f2f2f2", "#779077", "#0079BF", "#155196", "#78a2d4", "#eeecf1", "#607d8b", "#795548", "#a58e50", "#ceb163", "#b7b9bb", "#C63D0F", "#3B3738", "#FDF3E7", "#7E8F7C", "#A8CD1B", "#CBE32D", "#F3FAB6", "#558C89", "#74AFAD", "#D9853B", "#ECECEA", "#7D1935", "#4A96AD", "#F5F3EE", "#FFFFFF", "#E44424", "#67BCDB", "#A2AB58", "#FFFFFF", "#585858", "#118C4E", "#FF9009"];

      return _react2.default.createElement(
        'div',
        { style: { backgroundColor: this.state.backColor, padding: 8, height: "100vh", width: "95vw" } },
        _react2.default.createElement(
          'div',
          { id: 'CommonView', style: { marginLeft: "auto", marginRight: "auto", minWidth: 770, width: this.state.isAMobile || window.innerWidth < window.innerHeight ? "95vw" : "70%", height: "100vh" } },
          _react2.default.createElement(
            _Card.Card,
            { style: { minHeight: 100, marginBottom: 10, paddingTop: 20, paddingLeft: 20, paddingBottom: 10 } },
            _react2.default.createElement('img', { src: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/University_of_Kent_logo.svg/1280px-University_of_Kent_logo.svg.png', style: { height: 55, marginTop: 0, marginLeft: 5 } }),
            _react2.default.createElement('img', { src: 'https://www.cam.ac.uk/sites/www.cam.ac.uk/files/inner-images/logo.jpg', style: { height: 50, marginTop: 0, marginLeft: 5 } }),
            _react2.default.createElement('img', { src: 'http://www.cipil.law.cam.ac.uk/sites/www.law.cam.ac.uk/files/images/www.cipil.law.cam.ac.uk/legacy/images/logo_cipil_3.gif', style: { height: 50, marginTop: 0, marginLeft: 5 } }),
            _react2.default.createElement(
              'span',
              { style: { float: "right", marginTop: 5 } },
              _react2.default.createElement(
                'h2',
                { style: { margin: "0 0 0 0", marginRight: 25, marginTop: -5 } },
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
                    { style: { color: "#155196" } },
                    'Oral History Project'
                  )
                )
              )
            )
          ),
          this.props.children,
          _react2.default.createElement(
            _Card.Card,
            { style: { padding: 50, paddingTop: 1, marginTop: 5, paddingBottom: 10 } },
            _react2.default.createElement(
              'h3',
              null,
              'Copyright statement'
            ),
            _react2.default.createElement(
              'span',
              { style: { fontSize: 14, lineHeight: 0 } },
              'You may copy and distribute the transcriptions and commentaries in this resource, or parts of such transcriptions and commentaries, in any medium, for non-commercial purposes as long as the source is acknowledged, and you indicate it as Bellido & Bently (eds), Intellectual Property- Oral History Project (',
              _react2.default.createElement(
                'a',
                { href: "http://www.iporalhistory.co.uk" },
                'www.iporalhistory.co.uk'
              ),
              '). You may not publish any document and photograph for any commercial purposes, including charging a fee for providing access to these documents amd photographs via a network. This licence does not affect your statutory rights of fair dealing. We are unable to grant you the right to reproduce or duplicate some of these photographs or documents in so far as the images or scans are protected by copyright or we have only been able to reproduce them here by giving contractual undertakings.',
              _react2.default.createElement('br', null),
              _react2.default.createElement('br', null),
              _react2.default.createElement('hr', null)
            ),
            _react2.default.createElement('img', { src: 'http://www.create.ac.uk/wp-content/uploads/logos/create_primary_logo_160.jpg', style: logoStyle }),
            _react2.default.createElement('img', { src: 'http://www.gla.ac.uk/media/media_434161_en.jpg', style: logoStyle })
          )
        )
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