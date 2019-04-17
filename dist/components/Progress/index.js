"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Progress =
/*#__PURE__*/
function (_Component) {
  _inherits(Progress, _Component);

  function Progress() {
    var _this;

    _classCallCheck(this, Progress);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Progress).call(this));

    _defineProperty(_assertThisInitialized(_this), "onClick", function (_ref) {
      var clientX = _ref.clientX;
      var onClick = _this.props.onClick;
      var progressRef = _this.progressContainer.current;
      var progress = (clientX - progressRef.getBoundingClientRect().left) / progressRef.clientWidth;
      onClick(progress);
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (_ref2) {
      var keyCode = _ref2.keyCode;
      var _this$props = _this.props,
          percent = _this$props.percent,
          onClick = _this$props.onClick;

      switch (keyCode) {
        case 37:
        case 40:
          onClick(Math.max(percent - 0.05, 0));
          break;

        case 38:
        case 39:
          onClick(Math.min(percent + 0.05, 0.9999));
          break;

        default:
          break;
      }
    });

    _this.progressContainer = _react.default.createRef();
    return _this;
  }

  _createClass(Progress, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          percent = _this$props2.percent,
          strokeColor = _this$props2.strokeColor,
          strokeWidth = _this$props2.strokeWidth;
      return _react.default.createElement("div", {
        ref: this.progressContainer,
        role: "progressbar",
        tabIndex: "-1",
        className: "progress",
        style: {
          height: "".concat(strokeWidth, "px")
        },
        onClick: this.onClick,
        onKeyDown: this.onKeyDown
      }, _react.default.createElement("div", {
        className: "progress-inner",
        style: {
          width: "".concat(percent * 100, "%"),
          backgroundColor: strokeColor
        }
      }));
    }
  }]);

  return Progress;
}(_react.Component);

exports.default = Progress;

_defineProperty(Progress, "propTypes", {
  percent: _propTypes.default.number,
  strokeColor: _propTypes.default.string,
  strokeWidth: _propTypes.default.number
});

_defineProperty(Progress, "defaultProps", {
  percent: 0,
  strokeColor: '#9b9b9b',
  strokeWidth: 2
});