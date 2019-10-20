import React, { Component } from 'react';
import Storage from '../../common/Storage.js';


export default class Schedule extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Bienvenido!</h1>
                <h3>Su token es:</h3>
                <span>{Storage.tokenSession}</span>
            </div>
        );
    }
}
