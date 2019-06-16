webpackHotUpdate("static\\development\\pages\\router.js",{

/***/ "./pages/router/index.js":
/*!*******************************!*\
  !*** ./pages/router/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "E:\\WebFrontEnd\\react-next\\pages\\router\\index.js";




var data = [{
  id: 10086,
  name: "LOL"
}, {
  id: 655,
  name: "Girl"
}]; // 报错：只能在客户端使用
// Router.beforePopState(({ url, as, options }) => {
//     if(url !== '/') {
//         window.location.href = as;
//         alert('不是主页');
//         return false;
//     }
//     return true;
// });

var TestLink = function TestLink(_ref) {
  var data = _ref.data;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_0___default.a, {
    as: "/router/test/".concat(data.id),
    href: "/router/test?q=".concat(data.name),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, "Link to ", data.name, " Page")));
};

var OtherLink = function OtherLink(_ref2) {
  var data = _ref2.data;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_0___default.a, {
    href: "/router/other?title=".concat(data.name),
    replace: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }, "Other Link to ", data.name, " Page")));
};

var Index = function Index(_ref3) {
  var router = _ref3.router;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_0___default.a, {
    as: "/head/666",
    href: "/head",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  }, "\u62E6\u622Apopstate\u6D4B\u8BD5")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_0___default.a, {
    href: "/router/prefetch",
    prefetch: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }, "\u9884\u52A0\u8F7D\u9875\u9762")), router.prefetch('/router/prefetch'), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
    onClick: function onClick() {
      return next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push('/router/prefetch');
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, "\u53E6\u4E00\u79CD\u9884\u52A0\u8F7D\u9875\u9762"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
    onClick: function onClick() {
      return next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push('/css');
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }, "\u8DEF\u7531\u8DF3\u8F6C"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
    onClick: function onClick() {
      return next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push({
        pathname: '/router/other',
        query: {
          title: 'sleepyyyyyyyyyy'
        }
      });
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  }, "\u8DEF\u7531\u4F20\u53C2\u8DF3\u8F6C"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_0___default.a, {
    href: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
    src: "static/jojo.png",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  })), data.map(function (item) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(TestLink, {
      key: item.id,
      data: item,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66
      },
      __self: this
    });
  }), data.map(function (item) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(OtherLink, {
      key: item.id,
      data: item,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 69
      },
      __self: this
    });
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_1__["withRouter"])(Index));

/***/ })

})
//# sourceMappingURL=router.js.3364975a1515d3b646ed.hot-update.js.map