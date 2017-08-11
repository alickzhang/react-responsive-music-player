import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './MusicPlayer.css'

class MusicPlayer extends Component {
  constructor() {
    super()
    this.state = {
      activeMusicIndex: 0,
      leftTime: '00:00',
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
      progress: progress
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

  formatTime(time) {
    const mins = Math.floor(time / 60)
    const secs = (time % 60).toFixed()
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  render() {
    return (
      <div className="player-container" style={this.props.style}>
        <audio
          autoPlay={this.props.autoplay}
          className="audio"
          ref={(ref) => { this.audioContainer = ref }}
          src="http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3"
        />
        <div>
          <div className="music-info">
            <h2 className="music-title">Bedtime Stories</h2>
            <h3 className="artist">Jay Chou</h3>
          </div>
          <div className="row">
            <div className="left-time">-{this.state.leftTime}</div>
            <div className="volume-container"></div>
          </div>
          <div
            className="progress-container"
            onClick={this.adjustProgress.bind(this)}
            ref={(ref) => { this.progressContainer = ref }}
          >
            <div className="progress" style={{width: `${this.state.progress * 100}%`, background: this.props.themeColor}}></div>
          </div>
        </div>
        <div className="cover">
          <img src="http://res.cloudinary.com/alick/image/upload/v1502375983/cover-sm_se17pg.jpg" alt=""/>
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
