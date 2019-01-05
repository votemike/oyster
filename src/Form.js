import React, { Component } from 'react';

class Form extends Component {
    render() {
        return (
            <form>
                <label>
                    From Zone:
                    <select value={this.props.value.fromZone} onChange={this.props.fromChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </label>
                <label>
                    To Zone:
                    <select value={this.props.value.toZone} onChange={this.props.toChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </label>
                <label>
                    Days per week:
                    <select value={this.props.value.days} onChange={this.props.daysChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                </label>
            </form>
        );
    }
}

export default Form;
