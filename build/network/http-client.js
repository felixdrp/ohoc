'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HttpClient = function () {
  function HttpClient() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, HttpClient);

    this.config = config;

    this.standardOptions = {
      host: typeof location != "undefined" ? location.hostname : '',
      port: typeof location != "undefined" ? location.port : 0,
      method: 'GET'
    };

    this.standardOptions = (0, _extends3.default)({}, this.standardOptions, config);
  }

  (0, _createClass3.default)(HttpClient, [{
    key: 'send',
    value: function send() {
      var _this = this;

      var messageBody = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return new _promise2.default(function (resolve, reject) {
        _http2.default.request(
        (0, _extends3.default)({}, _this.standardOptions, options), function (response) {
          var data = '';

          response.on('error', function (err) {
            reject('Communication error: ' + err);
            console.error(err);
          });

          response.on('data', function (chunk) {
            data += chunk;
          });

          response.on('end', function () {
            resolve(data);
          });
        }).end(messageBody);
      });
    }
  }]);
  return HttpClient;
}();

exports.default = HttpClient;