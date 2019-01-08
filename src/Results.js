import React, { Component } from 'react';

import dailyCaps from './caps/daily';
import weeklyCaps from './caps/weekly';

import monthlyPrices from './prices/monthly';
import weeklyPrices from './prices/weekly';
import yearlyPrices from './prices/yearly';

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
        return Math.min(this._getPriceForZones(dailyCaps)*this.props.days, this._getPriceForZones(weeklyCaps)).toFixed(2);
    }

    renderWeeklyPriceForWeeklyRailcard() {
        return this._getPriceForZones(weeklyPrices).toFixed(2);
    }

    renderWeeklyPriceForMonthlyRailcard() {
        return (this._getPriceForZones(monthlyPrices)/365*12*7).toFixed(2);
    }

    renderWeeklyPriceForYearlyRailcard() {
        return (this._getPriceForZones(yearlyPrices)/365*7).toFixed(2);
    }

    _getPriceForZones(prices) {
        const lower =  Math.min(this.props.fromZone, this.props.toZone);
        const upper =  Math.max(this.props.fromZone, this.props.toZone);

        return prices[lower][upper];
    }
}

export default Results;
