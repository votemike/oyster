import React, { Component } from 'react';
import Form from './Form.js';
import Results from './Results.js';
import './App.css';

class App extends Component {
    // @TODO Design
    // @TODO Percentage savings in a half-table triangle thing
    // @TODO All zones (Gatwick/Watford/Shenfield etc...)
    // @TODO Commuter Zone saving
    // @TODO download Oyster history and suggest from that
    // @TODO Off-Peak/On-Peak (including both)
    // @TODO part travelcard, part PAYG prices
    // @TODO Suggest upgrading zones as some travel cards allow that
    // @TODO if you have zone 2-3 travel card, for X more, you could upgrade to 1-3 which = Y trips in to central
    // @TODO Holiday days per year
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
            <h1>Oyster App</h1>
            <p>Use this tool to help gauge which ticket type to buy and if it is better to stick with pay-as-you-go for the number of days you travel.<br/>This tool is in development and may not be 100% accurate. All fares are based on anytime prices.<br/>The tool does not deal with travel outside of the Oyster zones.</p>
            {this.renderForm()}<br/>
            {this.renderResults()}
        </header>
      </div>
    );
  }
}

export default App;
