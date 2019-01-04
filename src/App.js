import React, { Component } from 'react';
import Test from './Test.js';
import './App.css';

class App extends Component {
  renderTest() {
    return (<Test/>);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
            {this.renderTest()}
        </header>
      </div>
    );
  }
}

export default App;
