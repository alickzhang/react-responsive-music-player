var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MusicPlayer.css';

var MusicPlayer = function (_Component) {
  _inherits(MusicPlayer, _Component);

  function MusicPlayer(props) {
    _classCallCheck(this, MusicPlayer);

    var _this = _possibleConstructorReturn(this, (MusicPlayer.__proto__ || Object.getPrototypeOf(MusicPlayer)).call(this, props));

    _this.state = {
      activeMusicIndex: 0,
      leftTime: 0,
      play: _this.props.autoplay || false,
      playMode: 'loop',
      progress: 0,
      volume: 1
    };
    _this.modeList = ['loop', 'random', 'repeat'];
    return _this;
  }

  _createClass(MusicPlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var audioContainer = this.audioContainer;
      audioContainer.addEventListener('timeupdate', this.updateProgress.bind(this));
      audioContainer.addEventListener('ended', this.end.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var audioContainer = this.audioContainer;
      audioContainer.removeEventListener('timeupdate', this.updateProgress.bind(this));
      audioContainer.removeEventListener('ended', this.end.bind(this));
    }
  }, {
    key: 'updateProgress',
    value: function updateProgress() {
      var duration = this.audioContainer.duration;
      var currentTime = this.audioContainer.currentTime;
      var progress = currentTime / duration;
      this.setState({
        progress: progress,
        leftTime: duration - currentTime
      });
    }
  }, {
    key: 'end',
    value: function end() {
      var _state = this.state,
          playMode = _state.playMode,
          activeMusicIndex = _state.activeMusicIndex;

      if (playMode === 'repeat') {
        this.audioContainer.play();
      } else if (playMode === 'loop') {
        this.handleNext();
      } else if (playMode === 'random') {
        var randomIndex = Math.floor(Math.random() * this.props.playlist.length);
        while (randomIndex === activeMusicIndex) {
          randomIndex = Math.floor(Math.random() * this.props.playlist.length);
        }
        this._playMusic(randomIndex);
      } else {
        this.setState({ play: false });
      }
    }
  }, {
    key: 'handleAdjustProgress',
    value: function handleAdjustProgress(e) {
      var _this2 = this;

      var progressContainer = this.progressContainer;
      var progress = (e.clientX - progressContainer.getBoundingClientRect().left) / progressContainer.clientWidth;
      var currentTime = this.audioContainer.duration * progress;
      this.audioContainer.currentTime = currentTime;
      this.setState({
        play: true,
        progress: progress
      }, function () {
        _this2.audioContainer.play();
      });
    }
  }, {
    key: 'handleAdjustVolume',
    value: function handleAdjustVolume(e) {
      var volumeContainer = this.volumeContainer;
      var volume = (e.clientX - volumeContainer.getBoundingClientRect().left) / volumeContainer.clientWidth;
      volume = volume < 0 ? 0 : volume;
      this.audioContainer.volume = volume;
      this.setState({
        volume: volume
      });
    }
  }, {
    key: 'handleToggle',
    value: function handleToggle() {
      this.state.play ? this.audioContainer.pause() : this.audioContainer.play();
      this.setState({ play: !this.state.play });
    }
  }, {
    key: 'handlePrev',
    value: function handlePrev() {
      var total = this.props.playlist.length;
      var activeMusicIndex = this.state.activeMusicIndex > 0 ? this.state.activeMusicIndex - 1 : total - 1;
      this._playMusic(activeMusicIndex);
    }
  }, {
    key: 'handleNext',
    value: function handleNext() {
      var total = this.props.playlist.length;
      var activeMusicIndex = this.state.activeMusicIndex < total - 1 ? this.state.activeMusicIndex + 1 : 0;
      this._playMusic(activeMusicIndex);
    }
  }, {
    key: 'handleChangePlayMode',
    value: function handleChangePlayMode() {
      var index = this.modeList.indexOf(this.state.playMode);
      index = (index + 1) % this.modeList.length;
      this.setState({ playMode: this.modeList[index] });
    }
  }, {
    key: '_playMusic',
    value: function _playMusic(index) {
      var _this3 = this;

      this.setState({
        activeMusicIndex: index,
        leftTime: 0,
        play: true,
        progress: 0
      }, function () {
        _this3.audioContainer.play();
      });
    }
  }, {
    key: '_formatTime',
    value: function _formatTime(time) {
      if (isNaN(time) || time === 0) {
        return;
      }
      var mins = Math.floor(time / 60);
      var secs = (time % 60).toFixed();
      return '' + (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
    }
  }, {
    key: '_processArtistName',
    value: function _processArtistName(artistList) {
      return artistList.join(' / ');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state2 = this.state,
          activeMusicIndex = _state2.activeMusicIndex,
          playMode = _state2.playMode;

      var activeMusic = this.props.playlist[activeMusicIndex];
      var playModeClass = playMode === 'loop' ? 'refresh' : playMode === 'random' ? 'random' : 'repeat';

      return React.createElement(
        'div',
        { className: 'player-container', style: this.props.style },
        React.createElement('audio', {
          autoPlay: this.state.play,
          preload: 'auto',
          ref: function ref(_ref) {
            _this4.audioContainer = _ref;
          },
          src: activeMusic.url
        }),
        React.createElement(
          'div',
          { className: 'info-and-control' },
          React.createElement(
            'div',
            { className: 'music-info' },
            React.createElement(
              'h2',
              { className: 'title' },
              activeMusic.title
            ),
            React.createElement(
              'h3',
              { className: 'artist' },
              this._processArtistName(activeMusic.artist)
            )
          ),
          React.createElement(
            'div',
            { className: 'time-and-volume' },
            React.createElement(
              'div',
              { className: 'left-time' },
              '-',
              this._formatTime(this.state.leftTime)
            ),
            React.createElement(
              'div',
              { className: 'volume-container' },
              React.createElement(
                'div',
                { className: 'volume-icon' },
                React.createElement('i', { className: 'icon fa fa-volume-up' })
              ),
              React.createElement(
                'div',
                { className: 'volume-wrapper' },
                React.createElement(
                  'div',
                  {
                    className: 'progress-container',
                    onClick: this.handleAdjustVolume.bind(this),
                    ref: function ref(_ref2) {
                      _this4.volumeContainer = _ref2;
                    }
                  },
                  React.createElement('div', { className: 'progress', style: { width: this.state.volume * 100 + '%' } })
                )
              )
            )
          ),
          React.createElement(
            'div',
            {
              className: 'progress-container',
              onClick: this.handleAdjustProgress.bind(this),
              ref: function ref(_ref3) {
                _this4.progressContainer = _ref3;
              }
            },
            React.createElement('div', { className: 'progress', style: { width: this.state.progress * 100 + '%', background: this.props.themeColor } })
          ),
          React.createElement(
            'div',
            { className: 'control-container' },
            React.createElement(
              'div',
              { className: 'mode-control' },
              React.createElement('i', { className: 'icon fa fa-' + playModeClass, onClick: this.handleChangePlayMode.bind(this) })
            ),
            React.createElement(
              'div',
              { className: 'controls' },
              React.createElement('i', { className: 'icon fa fa-step-backward', onClick: this.handlePrev.bind(this) }),
              React.createElement('i', { className: 'icon fa fa-' + (this.state.play ? 'pause' : 'play'), onClick: this.handleToggle.bind(this) }),
              React.createElement('i', { className: 'icon fa fa-step-forward', onClick: this.handleNext.bind(this) })
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'cover-container' },
          React.createElement('div', { className: 'cover', style: { backgroundImage: 'url(' + activeMusic.cover + ')' } })
        )
      );
    }
  }]);

  return MusicPlayer;
}(Component);

MusicPlayer.propTypes = {
  autoplay: PropTypes.bool,
  playlist: PropTypes.array.isRequired,
  style: PropTypes.object,
  themeColor: PropTypes.string
};
MusicPlayer.defaultProps = {
  autoplay: false,
  playlist: [],
  style: {},
  themeColor: '#66cccc'
};


export default MusicPlayer;
