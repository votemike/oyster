import React, { Component } from 'react';

class Results extends Component {
    state = {
        apiPrices: {}
    };

    componentDidMount() {
        this.fetchData(this.props.toZone, this.props.fromZone);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.toZone !== this.props.toZone || nextProps.fromZone !== this.props.fromZone) {
            this.fetchData(nextProps.toZone, nextProps.fromZone);
        }
    }

    fetchData(toZone, fromZone) {
        this.setState({ apiPrices: {}});
        let formData = new FormData();
        formData.append('PassengerType', 'Adult');
        formData.append('ZoneTo', `Zone ${toZone}`);
        formData.append('ZoneFrom', `Zone ${fromZone}`);

        fetch('https://tfl.gov.uk/Fares/TravelcardCapsPrices/', {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => this.setState({ apiPrices: data[0]}));
    }

    render() {
        if (!this.state.apiPrices.priceYear) {
            return (<div className="loader"></div>);
        }
        console.log(this.state.apiPrices);
        return (
            <table>
                <tbody>
                    <tr>
                        <th>Ticket Type</th>
                        <th>Cost per Week</th>
                        <th>Upfront Cost</th>
                        <th>Saving on Max</th>
                        <th>Info</th>
                    </tr>
                    <tr>
                        <th style={ { 'textAlign': 'right' } }>Oyster PAYG:</th>
                        <td style={ { 'textAlign': 'left' } }>£{this.renderWeeklyPriceForOysterPayg()}</td>
                        <td style={ { 'textAlign': 'left' } }>£0</td>
                        <td style={ { 'textAlign': 'left' } }>{this.percentageOfMostExpensive(this.renderWeeklyPriceForOysterPayg())}%</td>
                        <td style={ { 'textAlign': 'left' } }>PAYG Maximum</td>
                    </tr>
                    <tr>
                        <th style={ { 'textAlign': 'right' } }>Contactless PAYG:</th>
                        <td style={ { 'textAlign': 'left' } }>£{this.renderWeeklyPriceForContaclessPayg()}</td>
                        <td style={ { 'textAlign': 'left' } }>£0</td>
                        <td style={ { 'textAlign': 'left' } }>{this.percentageOfMostExpensive(this.renderWeeklyPriceForContaclessPayg())}%</td>
                        <td style={ { 'textAlign': 'left' } }>Monday to Sunday PAYG Maximum</td>
                    </tr>
                    <tr>
                        <th style={ { 'textAlign': 'right' } }>Weekly:</th>
                        <td style={ { 'textAlign': 'left' } }>£{this.renderWeeklyPriceForWeeklyRailcard()}</td>
                        <td style={ { 'textAlign': 'left' } }>£{this.state.apiPrices.travelcardWeekly.toFixed(2)}</td>
                        <td style={ { 'textAlign': 'left' } }>{this.percentageOfMostExpensive(this.renderWeeklyPriceForWeeklyRailcard())}%</td>
                        <td style={ { 'textAlign': 'left' } }></td>
                    </tr>
                    <tr>
                        <th style={ { 'textAlign': 'right' } }>Monthly:</th>
                        <td style={ { 'textAlign': 'left' } }>£{this.renderWeeklyPriceForMonthlyRailcard()}</td>
                        <td style={ { 'textAlign': 'left' } }>£{this.state.apiPrices.travelcardMonthly.toFixed(2)}</td>
                        <td style={ { 'textAlign': 'left' } }>{this.percentageOfMostExpensive(this.renderWeeklyPriceForMonthlyRailcard())}%</td>
                        <td style={ { 'textAlign': 'left' } }>Weekly price calculated assuming bought every month of the year</td>
                    </tr>
                    <tr>
                        <th style={ { 'textAlign': 'right' } }>Yearly:</th>
                        <td style={ { 'textAlign': 'left' } }>£{this.renderWeeklyPriceForYearlyRailcard()}</td>
                        <td style={ { 'textAlign': 'left' } }>£{this.state.apiPrices.travelcardAnnual.toFixed(2)}</td>
                        <td style={ { 'textAlign': 'left' } }>{this.percentageOfMostExpensive(this.renderWeeklyPriceForYearlyRailcard())}%</td>
                        <td style={ { 'textAlign': 'left' } }></td>
                    </tr>
                </tbody>
            </table>
        );
    }

    renderWeeklyPriceForOysterPayg() {
        return (this.state.apiPrices.paygCapDailyAnytime*this.props.days).toFixed(2);
    }

    renderWeeklyPriceForContaclessPayg() {
        return Math.min(this.state.apiPrices.paygCapDailyAnytime*this.props.days, this.state.apiPrices.paygCapMonSunContactless).toFixed(2);
    }

    renderWeeklyPriceForWeeklyRailcard() {
        return this.state.apiPrices.travelcardWeekly.toFixed(2);
    }

    renderWeeklyPriceForMonthlyRailcard() {
        return (this.state.apiPrices.travelcardMonthly/365*12*7).toFixed(2);
    }

    renderWeeklyPriceForYearlyRailcard() {
        return (this.state.apiPrices.travelcardAnnual/365*7).toFixed(2);
    }

    getMostExpensiveTravelCost() {
        let max = this.renderWeeklyPriceForOysterPayg();
        if (parseFloat(this.renderWeeklyPriceForWeeklyRailcard()) > parseFloat(max)) {
            max = this.renderWeeklyPriceForWeeklyRailcard();
        }
        if (parseFloat(this.renderWeeklyPriceForMonthlyRailcard()) > parseFloat(max)) {
            max = this.renderWeeklyPriceForMonthlyRailcard();
        }
        if (parseFloat(this.renderWeeklyPriceForYearlyRailcard()) > parseFloat(max)) {
            max = this.renderWeeklyPriceForYearlyRailcard();
        }

        return max;
    }

    percentageOfMostExpensive(amount) {
        const mostExpensive = parseFloat(this.getMostExpensiveTravelCost());
        return (100*(mostExpensive-parseFloat(amount))/mostExpensive).toFixed();
    }
}

export default Results;
