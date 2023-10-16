import React, { Component } from 'react'
import ReactAplayer from 'react-aplayer'

export default class Music extends Component {
  // event binding example
  onPlay = () => {
    console.log('on play')
  }

  onPause = () => {
    console.log('on pause')
  }

  // example of access aplayer instance
  onInit = (ap) => {
    this.ap = ap
  }

  render() {
    const props = {
      theme: '#F57F17',
      // lrcType: 3,
      audio: [
        {
          name: '散花',
          artist: '水月陵',
          url: 'https://dev.tcshust.top/api/music/v1?music=水月陵 - 散花.flac',
          // cover: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.jpg',
          // lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc',
          theme: '#ebd0c2',
        },
      ],
    }

    return (
      <div>
        <ReactAplayer
          {...props}
          onInit={this.onInit}
          onPlay={this.onPlay}
          onPause={this.onPause}
        />
        {/* example of access aplayer instance API */}
        <button onClick={() => this.ap.toggle()}>toggle</button>
      </div>
    )
  }
}
