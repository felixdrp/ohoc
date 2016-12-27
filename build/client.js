'use strict';

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = window.__INITIAL_STATE__ || {};

var middleware = (0, _reactRouterRedux.routerMiddleware)(_reactRouter.browserHistory);

var store = (0, _redux.createStore)((0, _redux.combineReducers)({
  routing: _reactRouterRedux.routerReducer,
  templateList: _templateList2.default
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