import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './MusicPlayer.css'

class MusicPlayer extends Component {
  componentDidMount() {
    console.log("did mount")
  }

  componentWillUnmount() {
    console.log("will unmount")
  }

  render() {
    return (
      <div className="player-container">
        <audio
          autoPlay={this.props.autoPlay}
          className="audio"
          ref={(ref) => { this.audioRef = ref }}
          src="http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3"
        />
        <div>
          <div className="music-info">
            <h2 className="music-title">Bedtime Stories</h2>
            <h3 className="artist">Jay Chou</h3>
          </div>
          <div className="row">
            <div className="left-time">-1:30</div>
            <div className="volume-container">abc</div>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{width: "50%", background: "#ff6666"}}></div>
          </div>
        </div>
        <div className="cover">
          <img src="http://res.cloudinary.com/alick/image/upload/v1502375983/cover-sm_se17pg.jpg" alt=""/>
        </div>
      </div>
    )
  }
}

MusicPlayer.propTypes = {
  autoplay: PropTypes.bool,
  playlist: PropTypes.array.isRequired
}

export default MusicPlayer
