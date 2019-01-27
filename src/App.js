import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
        <nav className="landing-nav">
        <ul className="landing-nav-ul">
          <li><Link to='/'><img src="./../assets/images/bloc_jams_logo.png" alt="Bloc Jams Landing" /></Link></li>
          <li><Link to='/library'>Library</Link></li>
        </ul>
        </nav>
        <h1 className="title">Bloc Jams</h1>
        </header>
        <main>
        <Route exact path="/" component={Landing} />
        <Route path="/Library" component={Library} />
        <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
