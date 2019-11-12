import React, { Component } from 'react';
import '../../assets/styles/ScheduleMovie.scss';

class ScheduleMovie extends Component {
    constructor(props) {
        super(props);
    }

    getTime = (date) => {
        let dateConvert = new Date(date.toString());
        let hour = dateConvert.getHours();
        let minutes = dateConvert.getMinutes();
        return `${hour}:${minutes}`;
    }

    render() {
        let startAt = this.getTime(this.props.movie.startAt);
        let endAt = this.getTime(this.props.movie.endAt);
        return (
            <div className="divScheduleMovie">
                <div className="divScheduleMovieTime">{startAt}</div>
                <div className="divScheduleMovieMovie">{this.props.movie.movieName}</div>
                {
                    this.props.movie.scheduleAttributes.length > 0 ?
                        this.props.movie.scheduleAttributes.map((sa, index) => {
                            return (
                                <div key={index} className="divScheduleMovieOthers">{sa.scheduleAttributeName}: {sa.duration} min</div>
                            );
                        })
                        : null

                }
                <div className="divScheduleMovieTime">{endAt}</div>
            </div>
        );
    }
}

export default ScheduleMovie;