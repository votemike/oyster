import React, { Component } from 'react';
import Form from './Form.js';
import Results from './Results.js';
import './App.css';

class App extends Component {
    // @TODO All zones (Gatwick etc...)
    // @TODO Design
    // @TODO download Oyster history and suggest from that
    // @TODO Off-Peak/On-Peak (including both)
    // @TODO Commuter Zone saving
    // @TODO part travelcard, part PAYG prices
    // @TODO call API to keep prices up to date each year
    constructor(props) {
        super(props);
        this.state = {
            fromZone: 1,
            toZone: 2,
            days: 1,
        };
        this.fromChange = this.fromChange.bind(this);
        this.toChange = this.toChange.bind(this);
        this.daysChange = this.daysChange.bind(this);
    }
    renderForm() {
        return (<Form value={this.state} fromChange={this.fromChange} toChange={this.toChange} daysChange={this.daysChange}/>);
    }
    renderResults() {
        return (<Results fromZone={this.state.fromZone} toZone={this.state.toZone} days={this.state.days}/>);
    }
    daysChange(event) {
        this.setState({days: event.target.value});
    }
    toChange(event) {
        this.setState({toZone: event.target.value});
    }
    fromChange(event) {
        this.setState({fromZone: event.target.value});
    }

    render() {
    return (
      <div className="App">
        <header className="App-header">
            Full adult anytime fares only<br/>
            For illustraction purposes only<br/>
            {this.renderForm()}
            {this.renderResults()}
        </header>
      </div>
    );
  }
}

export default App;
