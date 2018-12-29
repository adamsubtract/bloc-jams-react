import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props){
    super(props);

  const album = albumData.find( album => {
    return album.slug === this.props.match.params.slug
  });

  this.state = {
    album: album
  };
}

displayTime(time){
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  if(seconds < 10){
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds
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

          <table id="song-list">
            <colgroup>
              <col id="song-number-column" />
              <col id="song-title-column" />
              <col id="song-duration-column" />
            </colgroup>
            <tbody id="song-info">
            { this.state.album.songs.map((song, index) =>
                  <tr key={index}>
                  <th>{ index + 1 }{" "}
                   { song.title }{" "}
                    { displayTime(song.time) } </th>
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
