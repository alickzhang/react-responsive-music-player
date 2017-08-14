# React Responsive Music Player

## Example

Please see a demo here(http://alickzhang.github.io/react-responsive-music-player/)

## Install

``` bash
npm install react-responsive-music-player --save
```

## Usage

``` jsx
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

MIT
