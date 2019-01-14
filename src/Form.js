import React from 'react';

const Form = ({ value, fromChange, toChange, daysChange }) => (
    <form>
        <label>
            From Zone:
            <select value={value.fromZone} onChange={fromChange}>
                { Array.from(Array(9)).map((e,i)=>i+1).map( zone => (
                    <option key={zone} value={zone}>{zone}</option>
                ))}
            </select>
        </label>
        <br/>
        <label>
            To Zone:
            <select value={value.toZone} onChange={toChange}>
                { Array.from(Array(9)).map((e,i)=>i+1).map( zone => (
                    <option key={zone} value={zone}>{zone}</option>
                ))}
            </select>
        </label>
        <br/>
        <label>
            Days per week:
            <select value={value.days} onChange={daysChange}>
                { Array.from(Array(7)).map((e,i)=>i+1).map( day => (
                    <option key={day} value={day}>{day}</option>
                ))}
            </select>
        </label>
    </form>
);

export default Form;
