import React, { Component } from 'react';

class ScheduleRoom extends Component {

    state = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <table>
                    <tr>
                        <th>Horas</th>
                        <th>Sala 1</th>
                    </tr>
                </table>
            </div>
        );
    }
}

export default ScheduleRoom;