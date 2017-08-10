import React, { Component } from 'react'
import './MusicPlayer.css'

class MusicPlayer extends Component {
  render() {
    return (
      <div>
        <div className="progress-bar">
          <div className="progress" style={{width: "50%", background: "#ff6666"}}></div>
        </div>
      </div>
    )
  }
}

export default MusicPlayer
