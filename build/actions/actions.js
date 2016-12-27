'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TEMPLATE_LIST_SET = exports.TEMPLATE_LIST_SET = 'TEMPLATE_LIST_SET';

var templateListSet = exports.templateListSet = function templateListSet(templateList) {
  return {
    type: TEMPLATE_LIST_SET,
    payload: templateList
  };
};