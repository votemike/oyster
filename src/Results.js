import React, { Component } from 'react';

class Results extends Component {
    render() {
        return (
            <div>
                <b>PAYG Max</b>: £{this.renderWeeklyPriceForPayg()}<br/>
                <b>Weekly</b>: £{this.renderWeeklyPriceForWeeklyRailcard()}<br/>
                <b>Monthly</b> £{this.renderWeeklyPriceForMonthlyRailcard()} (Assuming bought every month of the year)<br/>
                <b>Yearly</b> £{this.renderWeeklyPriceForYearlyRailcard()}
            </div>
        );
    }

    renderWeeklyPriceForPayg() {
        const lower =  Math.min(this.props.fromZone, this.props.toZone);
        const upper =  Math.max(this.props.fromZone, this.props.toZone);
        //@TODO some travelcards are valid for extra zones
        const dailyCaps = {
            1: {
                1: 7.00,
                2: 7.00,
                3: 8.20
            },
            2: {
                2: 7.00,
                3: 8.20
            },
            3: {
                3: 8.20
            }
        };
        const weeklyCaps = {
            1: {
                1: 35.10,
                2: 35.10,
                3: 41.20
            },
            2: {
                2: 26.30,
                3: 26.30
            },
            3: {
                3: 26.30
            }
        };
        //@TODO these are the caps, need number of journeys per day to be more acurate....
        return Math.min(dailyCaps[lower][upper]*this.props.days, weeklyCaps[lower][upper]).toFixed(2);
    }

    renderWeeklyPriceForWeeklyRailcard() {
        const lower =  Math.min(this.props.fromZone, this.props.toZone);
        const upper =  Math.max(this.props.fromZone, this.props.toZone);
        //@TODO some travelcards are valid for extra zones
        const prices = {
            1: {
                1: 35.10,
                2: 35.10,
                3: 41.20
            },
            2: {
                2: 26.30,
                3: 26.30
            },
            3: {
                3: 26.30
            }
        };
        return (prices[lower][upper]).toFixed(2);
    }

    renderWeeklyPriceForMonthlyRailcard() {
        const lower =  Math.min(this.props.fromZone, this.props.toZone);
        const upper =  Math.max(this.props.fromZone, this.props.toZone);
        //@TODO some travelcards are valid for extra zones
        const prices = {
            1: {
                1: 134.80,
                2: 134.80,
                3: 158.30
            },
            2: {
                2: 101.00,
                3: 101.00
            },
            3: {
                3: 101.00
            }
        };
        return (prices[lower][upper]/365*12*7).toFixed(2);
    }

    renderWeeklyPriceForYearlyRailcard() {
        const lower =  Math.min(this.props.fromZone, this.props.toZone);
        const upper =  Math.max(this.props.fromZone, this.props.toZone);
        //@TODO some travelcards are valid for extra zones
        const prices = {
            1: {
                1: 1404.00,
                2: 1404.00,
                3: 1648.00
            },
            2: {
                2: 1052.00,
                3: 1052.00
            },
            3: {
                3: 1052.00
            }
        };
        return (prices[lower][upper]/365*7).toFixed(2);
    }
}

export default Results;
