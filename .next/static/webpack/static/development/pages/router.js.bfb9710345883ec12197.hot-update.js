webpackHotUpdate("static\\development\\pages\\router.js",{

/***/ "./pages/router/index.js":
/*!*******************************!*\
  !*** ./pages/router/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);


var data = [{
  id: 10086,
  name: "LOL"
}, {
  id: 655,
  name: "Girl"
}];

var TestLink = function TestLink(_ref) {
  var data = _ref.data;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    as: "/router/test/".concat(data.id),
    href: "/router/test?q=".concat(data.name)
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", null, "Link to ", data.name, " Page")));
};

var OtherLink = function OtherLink(_ref2) {
  var data = _ref2.data;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/router/other?title=".concat(data.name)
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", null, "Other Link to ", data.name, " Page")));
};

var Index = function Index() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, data.map(function (item) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TestLink, {
      key: item.id,
      data: item
    });
  }), data.map(function (item) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(OtherLink, {
      key: item.id,
      data: item
    });
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ })

})
//# sourceMappingURL=router.js.bfb9710345883ec12197.hot-update.js.map