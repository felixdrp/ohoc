"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PreviewGenerator;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PreviewGenerator(props) {
  var element = props.element,
      style = props.style;

  var elem = element;

  if (elem && elem.src) {
    if (elem.type.includes("image/")) {
      return _react2.default.createElement("img", { style: style, src: elem.src });
    } else if (elem.type.includes("audio/")) {
      return _react2.default.createElement("audio", { style: { width: "95%" }, controls: true, src: elem.src });
    } else if (elem.type.includes("video/")) {
      return _react2.default.createElement("video", { style: { width: "95%" }, controls: true, src: elem.src });
    } else {
      return _react2.default.createElement(
        "a",
        { style: { width: "95%" }, href: elem.src, target: "_blank" },
        elem.title
      );
    }
  }

  return _react2.default.createElement("span", null);
}

