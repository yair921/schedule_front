import React, { Component } from 'react';
import ScheduleMovie from './ScheduleMovie.jsx';
import '../../assets/styles/ScheduleRoom.scss';

class ScheduleRoom extends Component {

    state = {};

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        return (
            <div className="divScheduleRoom">
                <div className="divScheduleRoomTitle">{this.props.room.roomName}</div>
                {
                    this.props.room.movies.length > 0 ?
                        this.props.room.movies.map((movie, index) => {
                            return (
                                <ScheduleMovie key={index} movie={movie} />
                            )
                        })
                        : null
                }
                <div className="divScheduleRoomBtnAdd">
                    <a
                        id="btnAddMovie"
                        className="waves-effect waves-light btn-small"
                        onClick={() => { this.props.showModalScheduleAddMovie(this.props.room.supportedFormats) }}
                    >Agregar</a>
                </div>
            </div>
        );
    }
}

export default ScheduleRoom;