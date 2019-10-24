import React, { Component } from 'react';
import '../../assets/styles/ScheduleMovie.scss';

class ScheduleMovie extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="divScheduleMovie">
                <div className="divScheduleMovieTime">{this.props.startTime}</div>
                <div className="divScheduleMovieMovie">{this.props.movie}</div>
                <div className="divScheduleMovieOption">
                    <p>
                        <label>
                            <input type="checkbox" defaultChecked="checked" />
                            <span>Trailers</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" defaultChecked="checked" />
                            <span>Pautas</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" defaultChecked="checked" />
                            <span>Corto</span>
                        </label>
                    </p>
                </div>
                <div>{this.props.hasPattern}</div>
                <div>{this.props.hasTrailer}</div>
                <div>{this.props.hasShort}</div>
                <div className="divScheduleMovieTime">{this.props.endTime}</div>
            </div>
        );
    }
}

export default ScheduleMovie;