import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './MusicPlayer.css'

class MusicPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeMusicIndex: 3,
      leftTime: '00:00',
      play: this.props.autoplay || false,
      progress: 0,
      repeat: false,
    }
  }

  componentDidMount() {
    const audioContainer = this.audioContainer
    audioContainer.addEventListener('timeupdate', this.updateProgress.bind(this))
  }

  componentWillUnmount() {
    const audioContainer = this.audioContainer
    audioContainer.removeEventListener('timeupdate', this.updateProgress.bind(this))
  }

  adjustProgress(e) {
    const progressContainer = this.progressContainer
    const progress = (e.clientX - progressContainer.getBoundingClientRect().left) / progressContainer.clientWidth
    const currentTime = this.audioContainer.duration * progress
    this.audioContainer.currentTime = currentTime
    this.setState({
      play: true,
      progress: progress
    }, () => {
      this.audioContainer.play()
    })
  }

  updateProgress() {
    const duration = this.audioContainer.duration
    const currentTime = this.audioContainer.currentTime
    const progress = currentTime / duration
    this.setState({
      progress: progress,
      leftTime: this.formatTime(duration - currentTime)
    })
  }

  toggle() {
    this.state.play ? this.audioContainer.pause() : this.audioContainer.play()
    this.setState({ play: !this.state.play })
  }

  prev() {

  }

  next() {

  }

  formatTime(time) {
    const mins = Math.floor(time / 60)
    const secs = (time % 60).toFixed()
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  render() {
    const { activeMusicIndex } = this.state
    const activeMusic = this.props.playlist[activeMusicIndex]

    return (
      <div className="player-container" style={this.props.style}>
        <audio
          autoPlay={this.props.autoplay}
          className="audio"
          ref={(ref) => { this.audioContainer = ref }}
          src={activeMusic.url}
        />
        <div className="info-and-control">
          <div className="music-info">
            <h2 className="title">{activeMusic.title}</h2>
            <h3 className="artist">{activeMusic.artist}</h3>
          </div>
          <div className="time-and-volume">
            <div className="left-time">-{this.state.leftTime}</div>
            <div className="volume-container">
              <i className="icon fa fa-volume-up"></i>
            </div>
          </div>
          <div
            className="progress-container"
            onClick={this.adjustProgress.bind(this)}
            ref={(ref) => { this.progressContainer = ref }}
          >
            <div className="progress" style={{width: `${this.state.progress * 100}%`, background: this.props.themeColor}}></div>
          </div>
          <div className="controls">
            <i className="icon fa fa-step-backward" onClick={this.prev.bind(this)}></i>
            <i className={`icon fa fa-${this.state.play ? 'pause' : 'play'}`} onClick={this.toggle.bind(this)}></i>
            <i className="icon fa fa-step-forward" onClick={this.next.bind(this)}></i>
          </div>
        </div>
        <div className="cover-container">
          <div className="cover" style={{backgroundImage: `url(${activeMusic.cover})`}}></div>
        </div>
      </div>
    )
  }
}

MusicPlayer.defaultProps = {
  autoplay: false,
  themeColor: '#66cccc'
}

MusicPlayer.propTypes = {
  autoplay: PropTypes.bool,
  themeColor: PropTypes.string,
  playlist: PropTypes.array.isRequired,
  style: PropTypes.object
}

export default MusicPlayer
