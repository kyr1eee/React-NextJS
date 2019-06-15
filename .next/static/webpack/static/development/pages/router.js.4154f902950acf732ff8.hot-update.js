webpackHotUpdate("static\\development\\pages\\router.js",{

/***/ "./pages/router/index.js":
/*!*******************************!*\
  !*** ./pages/router/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);




var _jsxFileName = "E:\\WebFrontEnd\\react-next\\pages\\router\\index.js";



var data = [{
  id: 10086,
  name: "LOL"
}, {
  id: 655,
  name: "Girl"
}];
next_router__WEBPACK_IMPORTED_MODULE_5___default.a.beforePopState(function (_ref) {
  var url = _ref.url,
      as = _ref.as,
      options = _ref.options;

  if (as !== '/') {
    window.location.href = as;
    alert('不是主页');
    return false;
  }

  return true;
});

var TestLink = function TestLink(_ref2) {
  var data = _ref2.data;
  return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
    as: "/router/test/".concat(data.id),
    href: "/router/test?q=".concat(data.name),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, "Link to ", data.name, " Page")));
};

var OtherLink = function OtherLink(_ref3) {
  var data = _ref3.data;
  return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
    href: "/router/other?title=".concat(data.name),
    replace: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, "Other Link to ", data.name, " Page")));
};

var Index = function Index() {
  return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
    as: "/head/666",
    href: "/head",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }, "\u62E6\u622Apopstate\u6D4B\u8BD5")), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("button", {
    onClick: function onClick() {
      return next_router__WEBPACK_IMPORTED_MODULE_5___default.a.push('/css');
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, "\u8DEF\u7531\u8DF3\u8F6C"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
    href: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("img", {
    src: "static/jojo.png",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: this
  })), data.map(function (item) {
    return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(TestLink, {
      key: item.id,
      data: item,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      },
      __self: this
    });
  }), data.map(function (item) {
    return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(OtherLink, {
      key: item.id,
      data: item,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56
      },
      __self: this
    });
  }));
};

var A =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(A, _React$Component);

  function A() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, A);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__["default"])(A).apply(this, arguments));
  }

  return A;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ })

})
//# sourceMappingURL=router.js.4154f902950acf732ff8.hot-update.js.map