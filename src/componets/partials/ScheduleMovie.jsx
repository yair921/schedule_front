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
                <div className="divScheduleMovieOthers">Duración: {this.props.movie.duration} min</div>
                <div className="divScheduleMovieOthers">Trailer: {this.props.movie.trailer} min</div>
                <div className="divScheduleMovieOthers">Pauta: {this.props.movie.pattern} min</div>
                <div className="divScheduleMovieOthers">Corto: {this.props.movie.short} min</div>
          
                <div>{this.props.hasPattern}</div>
                <div>{this.props.hasTrailer}</div>
                <div>{this.props.hasShort}</div>
                <div className="divScheduleMovieTime">{endAt}</div>
            </div>
        );
    }
}

export default ScheduleMovie;