'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _components = require('./components/');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _links = require('./links');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlBase = _links.URL_BASE;





var routes = function routes(history) {
  return _react2.default.createElement(
    _reactRouter.Router,
    { history: history },
    _react2.default.createElement(
      _reactRouter.Route,
      { path: urlBase, component: _components.AppContainer },
      _react2.default.createElement(_reactRouter.IndexRoute, { component: _components.BrowseRecords }),
      _react2.default.createElement(_reactRouter.Route, { path: 'browser', component: _components.BrowseRecords }),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: 'categories', component: _components.CategoriesContainer },
        _react2.default.createElement(_reactRouter.Route, { path: urlBase + "categories/list/:categoryId", component: _components.CategoriesView }),
        _react2.default.createElement(_reactRouter.Route, { path: urlBase + "categories/list/:categoryId/:subcategoryId", component: _components.CategoriesView })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: 'records', component: _components.RecordContainer },
        _react2.default.createElement(_reactRouter.Route, { path: urlBase + "record/create", component: _components.RecordCreate }),
        _react2.default.createElement(_reactRouter.Route, { path: urlBase + "record/:recordId(/:recordName)", component: _components.RecordView })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: 'controlRoom', component: _components.RecordContainer },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: _components.BrowserToEdit }),
        _react2.default.createElement(_reactRouter.Route, { path: urlBase + "controlRoom/record/create", component: _components.RecordCreate }),
        _react2.default.createElement(_reactRouter.Route, { path: urlBase + "controlRoom/record/edit/:recordId(/:recordName)", component: _components.RecordEdit })
      )
    )
  );
};

exports.default = routes;