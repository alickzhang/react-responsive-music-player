import React from 'react';
import Player from '../../MusicPlayer';
import playlist from '../playlist';

export default () => <Player playlist={playlist} mode="vertical" width={320} />;
