import React from 'react';
import Player from '../../MusicPlayer';
import playlist from '../playlist';

export default () => (
  <div style={{ width: '600px', marginBottom: '60px' }}>
    <Player playlist={playlist} />
  </div>
);
