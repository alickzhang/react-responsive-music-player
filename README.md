# React Responsive Music Player

## Example

Please see a [demo](http://alickzhang.github.io/react-responsive-music-player/).

![](http://res.cloudinary.com/alick/image/upload/v1502761479/screenshot_mem5hg.png)
![](http://res.cloudinary.com/alick/image/upload/v1502763028/screenshot_uhqb7f.png)

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

prop          | type   | default | notes
--------------|--------|---------|--------
autoplay      | bool   | false   |
progressColor | string | #66cccc | the color of the progress
btnColor      | string | #4a4a4a | the color of the buttons
playlist      | array  | []      | the playlist
style         | object | {}      |

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
