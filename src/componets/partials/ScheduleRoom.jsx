import React, { Component } from 'react';
import ScheduleMovie from './ScheduleMovie.jsx';
import '../../assets/styles/ScheduleRoom.scss';

class ScheduleRoom extends Component {

    state = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="divScheduleRoom">
                <div className="divScheduleRoomTitle">{this.props.room}</div>
                <ScheduleMovie 
                startTime="06:30"
                movie="Rey León" 
                endTime="08:30"
                />
                <ScheduleMovie 
                startTime="08:30"
                movie="Proyecto Génesis" 
                endTime="10:30"
                />
                <ScheduleMovie 
                startTime="10:30"
                movie="The Joker" 
                endTime="12:30"
                />
            </div>
        );
    }
}

export default ScheduleRoom;