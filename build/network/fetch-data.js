'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _httpClient = require('./http-client');

var _httpClient2 = _interopRequireDefault(_httpClient);

var _links = require('../links');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlBase = _links.URL_BASE + 'api/';

var fetchData = function () {
  function fetchData() {
    (0, _classCallCheck3.default)(this, fetchData);

    this.httpClient = new _httpClient2.default();
  }

  (0, _createClass3.default)(fetchData, [{
    key: 'getGeneric',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(path) {
        var result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = void 0;

                _context.prev = 1;
                _context.next = 4;
                return this.httpClient.send('', { path: path });

              case 4:
                result = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](1);

                console.error('fetching template list error > ' + _context.t0);

              case 10:
                return _context.abrupt('return', result);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 7]]);
      }));

      function getGeneric(_x) {
        return _ref.apply(this, arguments);
      }

      return getGeneric;
    }()
  }, {
    key: 'getAllRecords',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getGeneric(urlBase + 'getAllRecords');

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getAllRecords() {
        return _ref2.apply(this, arguments);
      }

      return getAllRecords;
    }()
  }, {
    key: 'getRecordsByType',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(type) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.getGeneric(urlBase + 'getRecordsByType/' + type);

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getRecordsByType(_x2) {
        return _ref3.apply(this, arguments);
      }

      return getRecordsByType;
    }()
  }, {
    key: 'templateListGet',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.getGeneric(urlBase + 'templates/list');

              case 2:
                return _context4.abrupt('return', _context4.sent);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function templateListGet() {
        return _ref4.apply(this, arguments);
      }

      return templateListGet;
    }()
  }, {
    key: 'createRecord',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(data) {
        var newRecordId, body;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                newRecordId = void 0;
                body = (0, _stringify2.default)(data);
                _context5.prev = 2;
                _context5.next = 5;
                return this.httpClient.send(body, {
                  method: 'PUT',
                  path: urlBase + 'record/create',
                  headers: { 'content-type': 'application/json' }
                });

              case 5:
                newRecordId = _context5.sent;

                newRecordId = JSON.parse(newRecordId);
                _context5.next = 12;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5['catch'](2);

                console.error('fetching template list error > ' + _context5.t0);

              case 12:
                return _context5.abrupt('return', newRecordId);

              case 13:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 9]]);
      }));

      function createRecord(_x3) {
        return _ref5.apply(this, arguments);
      }

      return createRecord;
    }()
  }, {
    key: 'updateParagraph',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(template, subtemplate, paragraph) {
        var result, body;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                result = void 0;
                body = paragraph;

                console.log(template + " " + subtemplate + " " + paragraph);
                _context6.prev = 3;
                _context6.next = 6;
                return this.httpClient.send(body, {
                  method: 'POST',
                  path: urlBase + 'category/paragraphUpdate/' + template + "/" + subtemplate,
                  headers: { 'content-type': 'application/json' }
                });

              case 6:
                result = _context6.sent;

                result = JSON.parse(result);
                _context6.next = 13;
                break;

              case 10:
                _context6.prev = 10;
                _context6.t0 = _context6['catch'](3);

                console.error('fetching template list error > ' + _context6.t0);

              case 13:
                return _context6.abrupt('return', result);

              case 14:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[3, 10]]);
      }));

      function updateParagraph(_x4, _x5, _x6) {
        return _ref6.apply(this, arguments);
      }

      return updateParagraph;
    }()
  }, {
    key: 'getParagraph',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(template, subtemplate) {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.getGeneric(urlBase + 'category/getParagraph/' + template + "/" + subtemplate);

              case 2:
                return _context7.abrupt('return', _context7.sent);

              case 3:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getParagraph(_x7, _x8) {
        return _ref7.apply(this, arguments);
      }

      return getParagraph;
    }()
  }, {
    key: 'getRecordData',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(recordId) {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.getGeneric(urlBase + 'getRecord/' + recordId);

              case 2:
                return _context8.abrupt('return', _context8.sent);

              case 3:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getRecordData(_x9) {
        return _ref8.apply(this, arguments);
      }

      return getRecordData;
    }()
  }, {
    key: 'setRecordData',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(recordId, data) {
        var result, body;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                result = void 0;
                body = (0, _stringify2.default)(data);
                _context9.prev = 2;
                _context9.next = 5;
                return this.httpClient.send(body, {
                  method: 'POST',
                  path: urlBase + 'setRecord/' + recordId,
                  headers: { 'content-type': 'application/json' }
                });

              case 5:
                result = _context9.sent;

                result = JSON.parse(result);
                _context9.next = 12;
                break;

              case 9:
                _context9.prev = 9;
                _context9.t0 = _context9['catch'](2);

                console.error('fetching template list error > ' + _context9.t0);

              case 12:
                return _context9.abrupt('return', result);

              case 13:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this, [[2, 9]]);
      }));

      function setRecordData(_x10, _x11) {
        return _ref9.apply(this, arguments);
      }

      return setRecordData;
    }()
  }, {
    key: 'deleteRecord',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(recordId) {
        var result;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                result = void 0;
                _context10.prev = 1;
                _context10.next = 4;
                return this.httpClient.send('Delete Record', {
                  method: 'POST',
                  path: urlBase + 'deleteRecord/' + recordId
                });

              case 4:
                result = _context10.sent;

                result = JSON.parse(result);
                _context10.next = 11;
                break;

              case 8:
                _context10.prev = 8;
                _context10.t0 = _context10['catch'](1);

                console.error('fetching template list error > ' + _context10.t0);

              case 11:
                return _context10.abrupt('return', result);

              case 12:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this, [[1, 8]]);
      }));

      function deleteRecord(_x12) {
        return _ref10.apply(this, arguments);
      }

      return deleteRecord;
    }()
  }]);
  return fetchData;
}();

exports.default = fetchData;