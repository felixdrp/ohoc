"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = toTitleCase;
function toTitleCase(str) {
    if (str) return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    return "";
}