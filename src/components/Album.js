import React, { Component } from 'react';
import albumData from './../data/albums';
import './../App.css';

class Album extends Component {
  constructor(props){
    super(props);

  const album = albumData.find( album => {
    return album.slug === this.props.match.params.slug
  });

  this.state = {
    album: album,
    currentSong: album.songs[0],
    isPlaying: false,
    isHovered: false
  };

  this.audioElement = document.createElement('audio');
  this.audioElement.src = album.songs[0].audioSrc;
}

play(){
  this.audioElement.play();
  this.setState({ isPlaying: true });
}

pause() {
  this.audioElement.pause();
  this.setState({ isPlaying: false });
}

setSong(song){
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

handleHover(song, index) {
   this.setState({ isHovered: index + 1});
}

handleLeave(song, index) {
   this.setState({ isHovered: false});
}

handleRowDisplay(song, index) {
  return (

        (this.state.currentSong === song)
            ? (this.state.isPlaying
                ? <ion-icon name="pause"></ion-icon>
                : <ion-icon name="arrow-dropright-circle"></ion-icon>)
            : (this.state.isHovered === index + 1
                ? <ion-icon name="arrow-dropright-circle"></ion-icon>
                : index + 1)
     );
}

displayTime(time){
    return time ? `${Math.floor(time / 60)}
                :${Number(time % 60 / 100).toFixed(2).substr(2,3)}`
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
                     <td className="song-number">{ this.handleRowDisplay(song, index) }</td>
                     <td className="song-name">{ song.title } </td>
                     <td className="song-duration">{ this.displayTime(song.duration)} </td>

                  </tr>
                  )
            }
            </tbody>
          </table>
         </section>
       </section>
     );
   }
 }

export default Album;
