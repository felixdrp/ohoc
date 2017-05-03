'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _templateList = require('./reducers/template-list');

var _templateList2 = _interopRequireDefault(_templateList);

var _categoriesData = require('./categories-data');

var _categoriesData2 = _interopRequireDefault(_categoriesData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = (0, _extends3.default)({}, window.__INITIAL_STATE__ || {}, {
  categoryData: _categoriesData2.default
});

var middleware = (0, _reactRouterRedux.routerMiddleware)(_reactRouter.browserHistory);

var store = (0, _redux.createStore)((0, _redux.combineReducers)({
  routing: _reactRouterRedux.routerReducer,
  templateList: _templateList2.default,
  categoryData: function categoryData() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var action = arguments[1];
    return state;
  }
}), initialState, (0, _redux.compose)((0, _redux.applyMiddleware)(middleware),
window.devToolsExtension ? window.devToolsExtension() : function (f) {
  return f;
}));

var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  (0, _routes2.default)(history)
), document.getElementById('root'));