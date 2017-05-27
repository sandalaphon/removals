webpackHotUpdate(0,{

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(190);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(123);

var _reactRedux = __webpack_require__(263);

var _store = __webpack_require__(141);

var _store2 = _interopRequireDefault(_store);

var _ravenJs = __webpack_require__(88);

var _ravenJs2 = _interopRequireDefault(_ravenJs);

var _config = __webpack_require__(140);

var _LoginBox = __webpack_require__(139);

var _LoginBox2 = _interopRequireDefault(_LoginBox);

var _Home = __webpack_require__(138);

var _Home2 = _interopRequireDefault(_Home);

var _Planner = __webpack_require__(315);

var _Planner2 = _interopRequireDefault(_Planner);

var _Surveyor = __webpack_require__(316);

var _Surveyor2 = _interopRequireDefault(_Surveyor);

var _UpdateData = __webpack_require__(317);

var _UpdateData2 = _interopRequireDefault(_UpdateData);

var _Main = __webpack_require__(319);

var _Main2 = _interopRequireDefault(_Main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_ravenJs2.default.config(_config.sentry_url, {
  tags: { git_commit: "Joseph what the fuck",
    user_level: "access level mega" }
}).install();

// Raven.showReportDialog()//user gets a pop up


var TopComponent = function (_React$Component) {
  _inherits(TopComponent, _React$Component);

  function TopComponent() {
    _classCallCheck(this, TopComponent);

    return _possibleConstructorReturn(this, (TopComponent.__proto__ || Object.getPrototypeOf(TopComponent)).apply(this, arguments));
  }

  _createClass(TopComponent, [{
    key: 'render',
    value: function render() {

      //const rendered = if


      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: _store2.default },
        _react2.default.createElement(
          _reactRouter.Router,
          { history: _reactRouter.browserHistory },
          _react2.default.createElement(
            _reactRouter.Route,
            { path: '/', component: _Main2.default },
            _react2.default.createElement(_reactRouter.IndexRoute, { component: _Planner2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/home', component: _Home2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/planner', component: _Planner2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/surveyors_diary', component: _Surveyor2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/update_data', component: _UpdateData2.default })
          )
        )
      );
    }
  }]);

  return TopComponent;
}(_react2.default.Component);

//
// <IndexRoute component= {Home}/>


_reactDom2.default.render(_react2.default.createElement(TopComponent, { className: 'container' }), document.getElementById('app'));

/***/ }),

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 319:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(74);

var _reactRedux = __webpack_require__(263);

var _actionCreators = __webpack_require__(318);

var actionCreators = _interopRequireWildcard(_actionCreators);

var _Layout = __webpack_require__(314);

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments,
    search: state.search
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(actionCreators, dispatch);
}

var Main = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Layout2.default);

exports.default = Main;

/***/ })

})
//# sourceMappingURL=0.bf65183c04b92da32c29.hot-update.js.map