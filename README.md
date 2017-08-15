# React Responsive Music Player

## Example

Please see a [demo](http://alickzhang.github.io/react-responsive-music-player/).

![](http://res.cloudinary.com/alick/image/upload/v1502761479/screenshopt_mem5hg.png)
![](http://res.cloudinary.com/alick/image/upload/v1502761477/screenshopt-iphone_xsz6ny.png)

## Install

``` bash
npm install react-responsive-music-player --save
```

## Usage

``` jsx
import React, { Component } from 'react'
import MusicPlayer from 'react-responsive-music-player'

class App extends Component {
  render() {
    return (
      <div>
        ...
        <MusicPlayer playlist={playlist} />
        ...
      </div>
    )
  }
}
```

## API

### props

prop       | type   | default | notes
-----------|--------|---------|--------
autoplay   | bool   | false   |
playlist   | object | []      | the playlist
style      | object | {}      |
themeColor | string | #66cccc | the theme color of your app

### JSON

```
const playlist = [
  {
    url: 'path/to/mp3',
    cover: 'path/to/jpg',
    title: 'Despacito',
    artist: [
      'Luis Fonsi',
      'Daddy Yankee'
    ]
  },
  {
    url: 'path/to/mp3',
    cover: 'path/to/jpg',
    title: 'Bedtime Stories',
    artist: [
      'Jay Chou'
    ]
  }
]
```

## Development

``` bash
npm install
npm start
```

## License

MIT License

Copyright (c) 2017 Shixiang Zhang
