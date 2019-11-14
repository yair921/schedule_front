import React, { Component } from 'react';
import Helpers from '../../common/Helpers.js';
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
        let startAt = Helpers.getTime(this.props.movie.startAt);
        let endAt = Helpers.getTime(this.props.movie.endAt);
        return (
            <div
                className="divScheduleMovie"
                id={this.props.idElementMovie}
                onClick={() => this.props.showModalScheduleEditMovie(this.props.idElementMovie)}>
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