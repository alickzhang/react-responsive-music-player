import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Progress from './components/Progress';
import './MusicPlayer.scss';

const formatTime = time => {
  if (isNaN(time) || time === 0) {
    return '';
  }
  const mins = Math.floor(time / 60);
  const secs = (time % 60).toFixed();
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const processArtistName = artistList => artistList.join(' / ');

export default class MusicPlayer extends Component {
  static propTypes = {
    playlist: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        cover: PropTypes.string,
        title: PropTypes.string,
        artist: PropTypes.arrayOf(PropTypes.string)
      })
    ).isRequired,
    mode: PropTypes.oneOf(['horizontal', 'vertical']),
    autoplay: PropTypes.bool,
    progressColor: PropTypes.string,
    btnColor: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    mode: 'horizontal',
    autoplay: false,
    progressColor: '#66cccc',
    btnColor: '#4a4a4a',
    style: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      activeMusicIndex: 0,
      leftTime: 0,
      play: props.autoplay || false,
      playMode: 'loop',
      progress: 0,
      volume: 1
    };
    this.modeList = ['loop', 'random', 'repeat'];
    this.audioContainer = React.createRef();
  }

  componentDidMount() {
    this.audioContainer.current.addEventListener('timeupdate', this.updateProgress);
    this.audioContainer.current.addEventListener('ended', this.end);
  }

  componentWillUnmount() {
    this.audioContainer.current.removeEventListener('timeupdate', this.updateProgress);
    this.audioContainer.current.removeEventListener('ended', this.end);
  }

  updateProgress = () => {
    const { duration, currentTime } = this.audioContainer.current;
    const progress = currentTime / duration;
    this.setState({ progress, leftTime: duration - currentTime });
  };

  end = () => {
    this.handleNext();
  };

  handleAdjustProgress = value => {
    const currentTime = this.audioContainer.current.duration * value;
    this.audioContainer.current.currentTime = currentTime;
    this.setState({ play: true, progress: value }, () => this.audioContainer.current.play());
  };

  handleAdjustVolume = value => {
    const volume = value < 0 ? 0 : value;
    this.audioContainer.current.volume = volume;
    this.setState({ volume });
  };

  handleToggle = () => {
    const { play } = this.state;
    if (play) {
      this.audioContainer.current.pause();
    } else {
      this.audioContainer.current.play();
    }
    this.setState(({ play }) => ({ play: !play }));
  };

  handlePrev = () => {
    const { playlist } = this.props;
    const { playMode, activeMusicIndex } = this.state;
    if (playMode === 'repeat') {
      this.playMusic(activeMusicIndex);
    } else if (playMode === 'loop') {
      const total = playlist.length;
      const index = activeMusicIndex > 0 ? activeMusicIndex - 1 : total - 1;
      this.playMusic(index);
    } else if (playMode === 'random') {
      let randomIndex = Math.floor(Math.random() * playlist.length);
      while (randomIndex === activeMusicIndex) {
        randomIndex = Math.floor(Math.random() * playlist.length);
      }
      this.playMusic(randomIndex);
    } else {
      this.setState({ play: false });
    }
  };

  handleNext = () => {
    const { playlist } = this.props;
    const { playMode, activeMusicIndex } = this.state;
    if (playMode === 'repeat') {
      this.playMusic(activeMusicIndex);
    } else if (playMode === 'loop') {
      const total = playlist.length;
      const index = activeMusicIndex < total - 1 ? activeMusicIndex + 1 : 0;
      this.playMusic(index);
    } else if (playMode === 'random') {
      let randomIndex = Math.floor(Math.random() * playlist.length);
      while (randomIndex === activeMusicIndex) {
        randomIndex = Math.floor(Math.random() * playlist.length);
      }
      this.playMusic(randomIndex);
    } else {
      this.setState({ play: false });
    }
  };

  handleChangePlayMode = () => {
    const { playMode } = this.state;
    let index = this.modeList.indexOf(playMode);
    index = (index + 1) % this.modeList.length;
    this.setState({ playMode: this.modeList[index] });
  };

  playMusic = index => {
    this.setState({ activeMusicIndex: index, leftTime: 0, play: true, progress: 0 }, () => {
      this.audioContainer.current.currentTime = 0;
      this.audioContainer.current.play();
    });
  };

  render() {
    const { mode, progressColor, btnColor, playlist, style } = this.props;
    const { play, progress, leftTime, volume } = this.state;
    const { activeMusicIndex, playMode } = this.state;
    const activeMusic = playlist[activeMusicIndex];
    const playModeClass = playMode === 'loop' ? 'refresh' : playMode === 'random' ? 'random' : 'repeat';
    const btnStyle = { color: btnColor };

    return (
      <div className={classNames('player-container', { mode })} style={style}>
        <audio autoPlay={play} preload="auto" ref={this.audioContainer} src={activeMusic.url}>
          <track kind="captions" />
        </audio>
        <div className="info-and-control">
          <div className="music-info">
            <h2 className="title">{activeMusic.title}</h2>
            <h3 className="artist">{processArtistName(activeMusic.artist)}</h3>
          </div>
          <div className="time-and-volume">
            <div className="left-time">-{formatTime(leftTime)}</div>
            <div className="volume-container">
              <div className="volume-icon">
                <i className="icon fa fa-volume-up" />
              </div>
              <div className="volume-wrapper">
                <Progress percent={volume} onClick={this.handleAdjustVolume} />
              </div>
            </div>
          </div>
          <Progress percent={progress} strokeColor={progressColor} onClick={this.handleAdjustProgress} />
          <div className="control-container">
            <div className="mode-control">
              <i className={`icon fa fa-${playModeClass}`} style={btnStyle} onClick={this.handleChangePlayMode} />
            </div>
            <div className="controls">
              <i className="icon fa fa-step-backward" style={btnStyle} onClick={this.handlePrev} />
              <i className={`icon fa fa-${play ? 'pause' : 'play'}`} style={btnStyle} onClick={this.handleToggle} />
              <i className="icon fa fa-step-forward" style={btnStyle} onClick={this.handleNext} />
            </div>
          </div>
        </div>
        <div className="cover-container">
          <div className="cover" style={{ backgroundImage: `url(${activeMusic.cover})` }} />
        </div>
      </div>
    );
  }
}
