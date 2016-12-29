"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.default = previewGenerator;
function previewGenerator(elem, style) {
   if (elem.src) if (elem.type.includes("image/")) {
      return React.createElement("img", { style: style, src: URL_MULTIMEDIA + elem.src });
   } else if (elem.type.includes("audio/")) {
      return React.createElement("audio", { style: { width: "95%" }, controls: true, src: URL_MULTIMEDIA + elem.src });
   } else if (elem.type.includes("video/")) {
      return React.createElement("video", { style: { width: "95%" }, controls: true, src: URL_MULTIMEDIA + elem.src });
   } else {
      return React.createElement(
         "a",
         { style: { width: "95%" }, href: URL_MULTIMEDIA + elem.src, target: "_blank" },
         elem.title
      );
   }
   return React.createElement("span", null);
}