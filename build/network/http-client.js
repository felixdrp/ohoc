'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HttpClient = function () {
  function HttpClient() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, HttpClient);

    this.config = config;

    this.host = typeof location != "undefined" ? location.hostname : '';
    this.port = typeof location != "undefined" ? location.port : 0;
    this.location = "http://" + this.host + ":" + this.port;

    _axios2.default.defaults.baseURL = this.location;
  }

  (0, _createClass3.default)(HttpClient, [{
    key: 'send',
    value: function send() {
      var messageBody = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return new _promise2.default(function (resolve, reject) {

        (0, _axios2.default)(options).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          console.log(error);
        });
      });
    }
  }]);
  return HttpClient;
}();

exports.default = HttpClient;