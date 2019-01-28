import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <ul>
              <li><Link to='/'><img src="./../assets/images/bloc_jams_logo.png" alt="Bloc Jams Landing" /></Link></li>
              <li><Link to='/library'> Library</Link></li>
            </ul>
          </nav>
        </header>
        <main>
        <div className="front-page-background">
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </div>
        </main>
      </div>
    );
  }
}

export default App;
