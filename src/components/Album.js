import React, { Component } from 'react';
import albumData from './../data/albums';
import './../App.css';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props){
    super(props);

  const album = albumData.find( album => {
    return album.slug === this.props.match.params.slug
  });

  this.state = {
    album: album,
    isPlaying: false,
    isHovered: false,
    currentSong: album.songs[0],
    currentTime: 0,
    currentVolume: 0.3,
    duration: album.songs[0].duration
  };

  this.audioElement = document.createElement('audio');
  this.audioElement.src = album.songs[0].audioSrc;
}

componentDidMount() {
  this.eventListeners = {
    timeupdate: e => {
      this.setState({ currentTime: this.audioElement.currentTime });
    },
    durationchange: e => {
      this.setState({duration: this.audioElement.duration });
    },
    volumeChange: e => {
      this.setState({ currentVolume: this.audioElement.volume });
    }
  };

  this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
  this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  this.audioElement.addEventListener('volumeChange', this.eventListeners.volumeChange);

}

componentWillUnmount() {
  this.audioElement.src = null;
  this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
  this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  this.audioElement.removeEventListener('volumeChange', this.eventListeners.volumeChange);
}

play() {
  this.audioElement.play();
  this.setState({ isPlaying: true });
}

pause() {
  this.audioElement.pause();
  this.setState({ isPlaying: false });
}

setSong(song) {
  this.audioElement.src = song.audioSrc;
  this.setState({ currentSong: song });
}

handleSongClick(song) {
  const isSameSong = this.state.currentSong === song;

  if (this.state.isPlaying && isSameSong) {
    this.pause();
  } else {
    if (!isSameSong) { this.setSong(song); }
    this.play();
  }
}

handlePrevClick() {
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = Math.max(0, currentIndex - 1);
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play();
}

handleNextClick() {
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play();
}

handleTimeChange(e) {
  const newTime = this.audioElement.duration * e.target.value;
  this.audioElement.currentTime = newTime;
  this.setState({ currentTime: newTime });
}

handleVolumeChange(e) {
  const newVol = e.target.value;
  this.audioElement.volume = newVol;
  this.setState({ currentVolume: newVol });
}

handleHover(song, index) {
   this.setState({ isHovered: index + 1});
}

handleLeave(song, index) {
   this.setState({ isHovered: false});
}

handleRowDisplay(song, index) {
  return (
        // if song playing is song in row go to ? else go to :
        (this.state.currentSong === song)
            // song being hovered is playing, got to ? else go to :
            ? (this.state.isPlaying
                // show pause button
                ? <span className="ion-pause"></span>
                // song being hovered not playing, show play button
                : <span className="ion-play"></span>)
            // song not playing being hovered got to ? else go to :
            : (this.state.isHovered === index + 1
                // song not playing being hovered show play button
                ? <span className="ion-play"></span>
                // song not playing not being hovered show number
                : index + 1)
     );
}

formatTime(time){
    return time ? `${Math.floor(time / 60)}:${Number(time % 60 / 100).toFixed(2).substr(2,3)}`
                : '-:--'
}

formatDurationTime(time){
  return time ? `${Math.floor(time / 60)}:${Number(time % 60 / 100).toFixed(2).substr(2,3)}`
              : '-:--'
}

   render() {
     return (
       <section className="album">
         <section id="album-info">
            <img id="album-cover-art" src={this.state.album.albumCover} />
            <div className="album-details">
              <h1 id="album-cover-art">{this.state.album.title}</h1>
              <h2 className="artist">{this.state.album.artist}</h2>
              <div id="release-info">{this.state.album.releaseInfo}</div>
            </div>
          <table className="song-list">
            <colgroup id="song-list">
              <col id="song-number-column" />
              <col id="song-title-column" />
              <col id="song-duration-column" />
            </colgroup>
            <tbody className="song-info">
            {  this.state.album.songs.map((song, index) =>
                  <tr className="song" key={index}
                  onClick={() => this.handleSongClick(song)}
                  onMouseEnter={() => this.handleHover(song, index)}
                  onMouseLeave={() => this.handleLeave(song,index)}
                   >
                     <td className="song-number">{this.handleRowDisplay(song, index)} </td>
                     <td className="song-name">{song.title } </td>
                     <td className="song-duration">{ this.formatTime(song.duration)} </td>
                  </tr>
                  )
            }
            </tbody>
          </table>
         <PlayerBar
            duration={this.state.currentSong.duration}
            isPlaying={this.state.isPlaying}
            currentSong={this.state.currentSong}
            currentTime={this.audioElement.currentTime}
            currentVolume={this.currentVolume}
            //playerBar listeners
            handleSongClick={() => this.handleSongClick(this.state.currentSong)}
            handlePrevClick={() => this.handlePrevClick()}
            handleNextClick={() => this.handleNextClick()}
            //playback listeners
            handleTimeChange={(e) => this.handleTimeChange(e)}
            formatTime={() => this.formatTime(this.state.currentTime)}
            formatDurationTime={() => this.formatDurationTime(this.state.currentSong.duration)}
            //volume listeners
            handleVolumeChange={(e) => this.handleVolumeChange(e)}

          />
         </section>
       </section>
     );
   }
 }

export default Album;
