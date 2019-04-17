"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Progress = _interopRequireDefault(require("./components/Progress"));

require("./MusicPlayer.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var formatTime = function formatTime(time) {
  /* eslint no-restricted-globals: off */
  if (isNaN(time) || time === 0) {
    return '';
  }

  var mins = Math.floor(time / 60);
  var secs = (time % 60).toFixed();
  return "".concat(mins < 10 ? '0' : '').concat(mins, ":").concat(secs < 10 ? '0' : '').concat(secs);
};

var processArtistName = function processArtistName(artistList) {
  return artistList.join(' / ');
};

var getPlayModeClass = function getPlayModeClass(playMode) {
  if (playMode === 'loop') return 'refresh';
  if (playMode === 'random') return 'random';
  return 'repeat';
};

var MusicPlayer =
/*#__PURE__*/
function (_Component) {
  _inherits(MusicPlayer, _Component);

  function MusicPlayer(props) {
    var _this;

    _classCallCheck(this, MusicPlayer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MusicPlayer).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "updateProgress", function () {
      var _this$audioContainer$ = _this.audioContainer.current,
          duration = _this$audioContainer$.duration,
          currentTime = _this$audioContainer$.currentTime;
      var progress = currentTime / duration || 0;

      _this.setState({
        progress: progress,
        leftTime: duration - currentTime
      });
    });

    _defineProperty(_assertThisInitialized(_this), "end", function () {
      _this.handleNext();
    });

    _defineProperty(_assertThisInitialized(_this), "handleAdjustProgress", function (value) {
      var currentTime = _this.audioContainer.current.duration * value;
      _this.audioContainer.current.currentTime = currentTime;

      _this.setState({
        play: true,
        progress: value
      }, function () {
        return _this.audioContainer.current.play();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleAdjustVolume", function (value) {
      var volume = value < 0 ? 0 : value;
      _this.audioContainer.current.volume = volume;

      _this.setState({
        volume: volume
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleToggle", function () {
      var play = _this.state.play;

      if (play) {
        _this.audioContainer.current.pause();
      } else {
        _this.audioContainer.current.play();
      }

      _this.setState(function (_ref) {
        var play = _ref.play;
        return {
          play: !play
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handlePrev", function () {
      var playlist = _this.props.playlist;
      var _this$state = _this.state,
          playMode = _this$state.playMode,
          activeMusicIndex = _this$state.activeMusicIndex;

      if (playMode === 'repeat') {
        _this.playMusic(activeMusicIndex);
      } else if (playMode === 'loop') {
        var total = playlist.length;
        var index = activeMusicIndex > 0 ? activeMusicIndex - 1 : total - 1;

        _this.playMusic(index);
      } else if (playMode === 'random') {
        var randomIndex = Math.floor(Math.random() * playlist.length);

        while (randomIndex === activeMusicIndex) {
          randomIndex = Math.floor(Math.random() * playlist.length);
        }

        _this.playMusic(randomIndex);
      } else {
        _this.setState({
          play: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleNext", function () {
      var playlist = _this.props.playlist;
      var _this$state2 = _this.state,
          playMode = _this$state2.playMode,
          activeMusicIndex = _this$state2.activeMusicIndex;

      if (playMode === 'repeat') {
        _this.playMusic(activeMusicIndex);
      } else if (playMode === 'loop') {
        var total = playlist.length;
        var index = activeMusicIndex < total - 1 ? activeMusicIndex + 1 : 0;

        _this.playMusic(index);
      } else if (playMode === 'random') {
        var randomIndex = Math.floor(Math.random() * playlist.length);

        while (randomIndex === activeMusicIndex) {
          randomIndex = Math.floor(Math.random() * playlist.length);
        }

        _this.playMusic(randomIndex);
      } else {
        _this.setState({
          play: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleChangePlayMode", function () {
      var playMode = _this.state.playMode;

      var index = _this.modeList.indexOf(playMode);

      index = (index + 1) % _this.modeList.length;

      _this.setState({
        playMode: _this.modeList[index]
      });
    });

    _defineProperty(_assertThisInitialized(_this), "playMusic", function (index) {
      _this.setState({
        activeMusicIndex: index,
        leftTime: 0,
        play: true,
        progress: 0
      }, function () {
        _this.audioContainer.current.currentTime = 0;

        _this.audioContainer.current.play();
      });
    });

    _this.state = {
      activeMusicIndex: 0,
      leftTime: 0,
      play: props.autoplay || false,
      playMode: 'loop',
      progress: 0,
      volume: 1
    };
    _this.modeList = ['loop', 'random', 'repeat'];
    _this.audioContainer = _react.default.createRef();
    return _this;
  }

  _createClass(MusicPlayer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.audioContainer.current.addEventListener('timeupdate', this.updateProgress);
      this.audioContainer.current.addEventListener('ended', this.end);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.audioContainer.current.removeEventListener('timeupdate', this.updateProgress);
      this.audioContainer.current.removeEventListener('ended', this.end);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          playlist = _this$props.playlist,
          mode = _this$props.mode,
          width = _this$props.width,
          progressColor = _this$props.progressColor,
          btnColor = _this$props.btnColor,
          style = _this$props.style;
      var _this$state3 = this.state,
          play = _this$state3.play,
          progress = _this$state3.progress,
          leftTime = _this$state3.leftTime,
          volume = _this$state3.volume,
          activeMusicIndex = _this$state3.activeMusicIndex,
          playMode = _this$state3.playMode;
      var activeMusic = playlist[activeMusicIndex];
      var playModeClass = getPlayModeClass(playMode);
      var btnStyle = {
        color: btnColor
      };
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('player', {
          vertical: mode === 'vertical'
        }),
        style: _objectSpread({}, style, {
          width: typeof width === 'string' ? width : "".concat(width, "px")
        })
      }, _react.default.createElement("audio", {
        autoPlay: play,
        preload: "auto",
        ref: this.audioContainer,
        src: activeMusic.url
      }, _react.default.createElement("track", {
        kind: "captions"
      })), _react.default.createElement("div", {
        className: "player-control"
      }, _react.default.createElement("div", {
        className: "music-info"
      }, _react.default.createElement("h2", {
        className: "title"
      }, activeMusic.title), _react.default.createElement("h3", {
        className: "artist"
      }, processArtistName(activeMusic.artist))), _react.default.createElement("div", {
        className: "time-and-volume"
      }, _react.default.createElement("div", {
        className: "time-remaining"
      }, "-", formatTime(leftTime)), _react.default.createElement("div", {
        className: "volume-control"
      }, _react.default.createElement("i", {
        className: "volume-icon fa fa-volume-up"
      }), _react.default.createElement("div", {
        className: "volume-bar"
      }, _react.default.createElement(_Progress.default, {
        percent: volume,
        onClick: this.handleAdjustVolume
      })))), _react.default.createElement(_Progress.default, {
        percent: progress,
        strokeColor: progressColor,
        onClick: this.handleAdjustProgress
      }), _react.default.createElement("div", {
        className: "controls"
      }, _react.default.createElement("button", {
        type: "button",
        className: "fa fa-".concat(playModeClass),
        style: btnStyle,
        onClick: this.handleChangePlayMode
      }), _react.default.createElement("button", {
        type: "button",
        className: "fa fa-step-backward",
        style: btnStyle,
        onClick: this.handlePrev
      }), _react.default.createElement("button", {
        type: "button",
        className: "fa fa-".concat(play ? 'pause' : 'play'),
        style: btnStyle,
        onClick: this.handleToggle
      }), _react.default.createElement("button", {
        type: "button",
        className: "fa fa-step-forward",
        style: btnStyle,
        onClick: this.handleNext
      }))), _react.default.createElement("div", {
        className: "player-cover",
        style: {
          backgroundImage: "url(".concat(activeMusic.cover, ")")
        }
      }));
    }
  }]);

  return MusicPlayer;
}(_react.Component);

exports.default = MusicPlayer;

_defineProperty(MusicPlayer, "propTypes", {
  playlist: _propTypes.default.arrayOf(_propTypes.default.shape({
    url: _propTypes.default.string,
    cover: _propTypes.default.string,
    title: _propTypes.default.string,
    artist: _propTypes.default.arrayOf(_propTypes.default.string)
  })).isRequired,
  mode: _propTypes.default.oneOf(['horizontal', 'vertical']),
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  autoplay: _propTypes.default.bool,
  progressColor: _propTypes.default.string,
  btnColor: _propTypes.default.string,
  style: _propTypes.default.object
});

_defineProperty(MusicPlayer, "defaultProps", {
  mode: 'horizontal',
  width: '100%',
  autoplay: false,
  progressColor: '#66cccc',
  btnColor: '#4a4a4a',
  style: {}
});