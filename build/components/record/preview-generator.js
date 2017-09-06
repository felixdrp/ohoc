'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.default = PreviewGenerator;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _insertDriveFile = require('material-ui/svg-icons/editor/insert-drive-file');

var _insertDriveFile2 = _interopRequireDefault(_insertDriveFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PreviewGenerator(props) {
  var element = props.element,
      style = props.style;

  var elem = element;

  if (elem && elem.src) {
    if (elem.type.includes("image/")) {
      return _react2.default.createElement('img', { style: (0, _extends4.default)({}, style), src: elem.src });
    } else if (elem.type.includes("audio/")) {
      return _react2.default.createElement('audio', { style: (0, _extends4.default)({}, style), controls: true, src: elem.src });
    } else if (elem.type.includes("video/")) {
      return _react2.default.createElement('video', { style: (0, _extends4.default)({}, style, { width: "95%" }), controls: true, src: elem.src });
    } else {
      return _react2.default.createElement(
        'span',
        { style: (0, _extends4.default)({}, style, (0, _defineProperty3.default)({ display: "block", width: "100%", minHeight: 35, textAlign: "left" }, 'textAlign', "center")) },
        _react2.default.createElement(_insertDriveFile2.default, { style: { height: 35, width: 35, position: "relative", bottom: -3, left: -10 } }),
        _react2.default.createElement(
          'span',
          { style: { height: 35, paddingBottom: 10, position: "relative", bottom: 5, left: 10 } },
          _react2.default.createElement(
            'a',
            { href: elem.src, target: "_blank" },
            'Preview/Download'
          )
        )
      );
    }
  }

  return _react2.default.createElement('span', null);
}

