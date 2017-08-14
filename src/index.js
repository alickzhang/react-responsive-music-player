import React from 'react'
import ReactDOM from 'react-dom'
import MusicPlayer from './MusicPlayer'

const playlist = [
  {
    url: 'http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3',
    cover: 'http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg',
    title: 'Despacito',
    artist: [
      'Luis Fonsi',
      'Daddy Yankee'
    ]
  },
  {
    url: 'http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3',
    cover: 'http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg',
    title: 'Bedtime Stories',
    artist: [
      'Jay Chou'
    ]
  },
  {
    url: 'http://res.cloudinary.com/alick/video/upload/v1502444212/Actor_ud8ccw.mp3',
    cover: 'http://res.cloudinary.com/alick/image/upload/v1502444304/actor_umzdur.jpg',
    title: '演员',
    artist: [
      '薛之谦'
    ]
  },
  {
    url: 'http://res.cloudinary.com/alick/video/upload/v1502444215/Bridge_of_Fate_aaksg1.mp3',
    cover: 'http://res.cloudinary.com/alick/image/upload/v1502444306/Bridge_of_Fate_o36rem.jpg',
    title: 'Bridge of Fate',
    artist: [
      '王力宏',
      '谭维维'
    ]
  },
  {
    url: 'http://res.cloudinary.com/alick/video/upload/v1502444222/Goodbye_byaom5.mp3',
    cover: 'http://res.cloudinary.com/alick/image/upload/v1502444310/Goodbye_hpubmk.jpg',
    title: 'Goodbye',
    artist: [
      'G.E.M.'
    ]
  }
]

ReactDOM.render(<MusicPlayer playlist={playlist} autoplay />, document.getElementById('root'))
