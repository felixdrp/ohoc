'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = templateList;

var _actions = require('../actions/actions');

function templateList() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments[1];

  switch (action.type) {
    case _actions.TEMPLATE_LIST_SET:
      return action.payload.templateList;
    default:
      return state;
  }
}