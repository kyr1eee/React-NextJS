(window.webpackJsonp=window.webpackJsonp||[]).push([["135f"],{"3Hq7":function(e,t,r){"use strict";var n=r("q1tI"),o=r.n(n),a=r("YFqc"),i=r.n(a),l={marginRight:15},u=function(){return o.a.createElement("div",null,o.a.createElement(i.a,{href:"/"},o.a.createElement("a",{style:l},"Home")),o.a.createElement(i.a,{href:"/about"},o.a.createElement("a",{style:l},"About")))},f={margin:20,padding:20,border:"1px solid #DDD"};t.a=function(e){return o.a.createElement("div",{style:f},o.a.createElement(u,null),e.children)}},"9Jkg":function(e,t,r){e.exports=r("oh+g")},Juyh:function(e,t,r){"use strict";r.r(t);var n=r("q1tI"),o=r.n(n),a=r("3Hq7");t.default=function(){return o.a.createElement("div",null,o.a.createElement(a.a,null))}},YFqc:function(e,t,r){e.exports=r("cTJO")},cTJO:function(e,t,r){"use strict";var n=r("KI45"),o=n(r("9Jkg")),a=n(r("/HRN")),i=n(r("WaGi")),l=n(r("ZDA2")),u=n(r("/+P4")),f=n(r("N9n2")),s=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t},p=function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var c=r("CxY0"),h=s(r("q1tI")),d=(p(r("17x9")),s(r("nOHt"))),v=r("Bu4q");function m(e){return e&&"object"==typeof e?v.formatWithValidation(e):e}var y=function(e){function t(){var e,r,n,o,i;return(0,a.default)(this,t),(e=(0,l.default)(this,(0,u.default)(t).apply(this,arguments))).formatUrls=(r=function(e,t){return{href:m(e),as:m(t)}},n=null,o=null,i=null,function(e,t){if(e===n&&t===o)return i;var a=r(e,t);return n=e,o=t,i=a,a}),e.linkClicked=function(t){var r=t.currentTarget,n=r.nodeName,o=r.target;if("A"!==n||!(o&&"_self"!==o||t.metaKey||t.ctrlKey||t.shiftKey||t.nativeEvent&&2===t.nativeEvent.which)){var a=e.formatUrls(e.props.href,e.props.as),i=a.href,l=a.as;if(function(e){var t=c.parse(e,!1,!0),r=c.parse(v.getLocationOrigin(),!1,!0);return!t.host||t.protocol===r.protocol&&t.host===r.host}(i)){var u=window.location.pathname;i=c.resolve(u,i),l=l?c.resolve(u,l):i,t.preventDefault();var f=e.props.scroll;null==f&&(f=l.indexOf("#")<0),d.default[e.props.replace?"replace":"push"](i,l,{shallow:e.props.shallow}).then(function(e){e&&f&&(window.scrollTo(0,0),document.body.focus())}).catch(function(t){e.props.onError&&e.props.onError(t)})}}},e}return(0,f.default)(t,e),(0,i.default)(t,[{key:"componentDidMount",value:function(){this.prefetch()}},{key:"componentDidUpdate",value:function(e){(0,o.default)(this.props.href)!==(0,o.default)(e.href)&&this.prefetch()}},{key:"prefetch",value:function(){if(this.props.prefetch&&"undefined"!=typeof window){var e=window.location.pathname,t=this.formatUrls(this.props.href,this.props.as).href,r=c.resolve(e,t);d.default.prefetch(r)}}},{key:"render",value:function(){var e=this,t=this.props.children,r=this.formatUrls(this.props.href,this.props.as),n=r.href,o=r.as;"string"==typeof t&&(t=h.default.createElement("a",null,t));var a=h.Children.only(t),i={onClick:function(t){a.props&&"function"==typeof a.props.onClick&&a.props.onClick(t),t.defaultPrevented||e.linkClicked(t)}};return!this.props.passHref&&("a"!==a.type||"href"in a.props)||(i.href=o||n),i.href&&"undefined"!=typeof __NEXT_DATA__&&__NEXT_DATA__.nextExport&&(i.href=d.Router._rewriteUrlForNextExport(i.href)),h.default.cloneElement(a,i)}}]),t}(h.Component);t.default=y},"oh+g":function(e,t,r){var n=r("WEpk"),o=n.JSON||(n.JSON={stringify:JSON.stringify});e.exports=function(e){return o.stringify.apply(o,arguments)}},rB5V:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/about",function(){var e=r("Juyh");return{page:e.default||e}}])}},[["rB5V","5d41","9da1"]]]);