import React, { Component } from 'react';
import Modal from './Modal.jsx';
import Helpers from '../../common/Helpers.js';
import Storage from '../../common/Storage.js';
import '../../assets/styles/ModalScheduleEditMovie.scss';
const Queries = require('../../common/Queries.js');


class ModalScheduleEditMovie extends Component {
    state = {
        scheduleAttributes: []
    };

    selectedMovie = {};

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.getAllScheduleAttribute();
    }


    getAllScheduleAttribute = async () => {
        try {
            let method = 'getAllScheduleAttribute';
            let token = Storage.tokenSession;
            let query = Queries.getQuery(method, { token });
            let result = await Helpers.post(query);
            if (!result.status) {
                Helpers.showAlertError(result.message)
            } else if (!result.data[method].status) {
                Helpers.showAlertError(result.message)
            } else {
                this.setState({
                    scheduleAttributes: result.data[method].data
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    getCleaningTime = (idMovieFormat) => {
        debugger
        let objSupportedFormat = this.props.selectedRoom.supportedFormats.filter(supportedFormat => {
            if (supportedFormat.idMovieFormat.toString() === idMovieFormat)
                return supportedFormat;
        });
        if (objSupportedFormat && objSupportedFormat.length > 0)
            return objSupportedFormat[0].cleaningTime;
        else
            return 0;
    }

    getTotalDuration = (idParentElement) => {
        let inputStartAt = document.getElementById(`timeStartAt_${idParentElement}`).value;
        let inputEndAt = document.getElementById(`timeEndAt_${idParentElement}`);
        if (Helpers.isNullOrEmpty(inputStartAt)) {
            inputEndAt.value = '';
            return;
        }

        let dateStr = '2000-01-01';
        let hourValidate = parseInt(inputStartAt.split(':')[0]);
        if (hourValidate < 5) {
            dateStr = '2000-01-02';
        }
        let inputMovieDuration = document.getElementById(`numberMovieDuration_${idParentElement}`).value;
        let inputCleaningTime = document.getElementById(`numberMovieCleaning_${idParentElement}`).value;
        let minutes = parseInt(inputMovieDuration) + parseInt(inputCleaningTime);
        let elementScheduleAttribute;

        let tempScheduleAttributes = new Array();
        this.props.selectedMovie.scheduleAttributes.forEach(sa => {
            elementScheduleAttribute = document.getElementById(`${idParentElement}_${sa.idScheduleAttribute}`).value;
            elementScheduleAttribute = parseInt(elementScheduleAttribute);
            if (elementScheduleAttribute) {
                minutes = minutes + parseInt(elementScheduleAttribute);
                tempScheduleAttributes.push({
                    idScheduleAttribute: sa.idScheduleAttribute,
                    scheduleAttributeName: sa.scheduleAttributeName,
                    duration: elementScheduleAttribute
                });
            }
        });
        let startDate = new Date(`${dateStr} ${inputStartAt}:00`);

        let endDate = new Date(startDate.getTime() + (minutes * 60000));
        let endHour = endDate.getHours();
        let endMinutes = endDate.getMinutes();
        endHour = endHour.toString().length === 1 ? `0${endHour}` : endHour;
        endMinutes = endMinutes.toString().length === 1 ? `0${endMinutes}` : endMinutes;
        inputEndAt.value = `${endHour}:${endMinutes}`;
        debugger
        let paramsUpdateSelectedMovie = {
            idMovie: idParentElement,
            scheduleAttributes: tempScheduleAttributes,
            cleaningTime: parseInt(inputCleaningTime),
            startAt: startDate,
            endAt: endDate
        }
        this.updateSelectedMovie(paramsUpdateSelectedMovie);
    }

    updateSelectedMovie = (params) => {
        this.selectedMovie = {
            ...this.props.selectedMovie,
            scheduleAttributes: params.scheduleAttributes,
            cleaningTime: params.cleaningTime,
            startAt: params.startAt,
            endAt: params.endAt
        }
        console.log(this.selectedMovie);
    }

    render() {
        let startAt = Helpers.getTime(this.props.selectedMovie.startAt);
        let endAt = Helpers.getTime(this.props.selectedMovie.endAt);

        return (
            <Modal
                title="Editar Película"
                hideModal={this.props.hideModal}>
                <div className="divModalScheduleEditMovie">

                    <div
                        className="divModalScheduleEditMovieMovie"
                        id={`divMovie_${this.props.selectedMovie.idMovie}`}>
                        <div id={`divMovieName_${this.props.selectedMovie.movieName}`} className="divScheduleEditMovieMovie">{this.props.selectedMovie.movieName}</div>
                        <div className="divScheduleEditMovieTime"><span>Hora de inicio</span><input type="time" className="inputScheduleEditMovie" id={`timeStartAt_${this.props.selectedMovie.idMovie}`} onChange={() => this.getTotalDuration(this.props.selectedMovie.idMovie)} value={startAt} /></div>
                        {
                            this.props.selectedMovie.scheduleAttributes.length > 0 &&
                            this.props.selectedMovie.scheduleAttributes.map((sa, sa_index) => {
                                return (
                                    <div
                                        key={sa_index}
                                        className="divScheduleEditMovieOthers">{sa.scheduleAttributeName} <input type="number" id={`${this.props.selectedMovie.idMovie}_${sa.idScheduleAttribute}`} className="inputScheduleEditMovie" defaultValue={sa.duration} onChange={() => this.getTotalDuration(this.props.selectedMovie.idMovie)} /></div>
                                );
                            })
                        }
                        <div className="divScheduleEditMovieOthers">Duración <input type="number" id={`numberMovieDuration_${this.props.selectedMovie.idMovie}`} className="inputScheduleEditMovie" defaultValue={this.props.selectedMovie.duration} disabled /></div>
                        <div className="divScheduleEditMovieOthers">Limpieza <input type="number" id={`numberMovieCleaning_${this.props.selectedMovie.idMovie}`} className="inputScheduleEditMovie" disabled defaultValue={this.props.selectedMovie.cleaningTime} /></div>
                        <div className="divScheduleEditMovieTime">Hora Finalización <input type="time" id={`timeEndAt_${this.props.selectedMovie.idMovie}`} className="inputScheduleEditMovie" disabled value={endAt} /></div>
                    </div>




                </div>
                <div className="col s12 l2 right-align">
                    <a
                        className="waves-effect waves-light btn-small"
                        id="btnNext"
                        onClick={() => { this.props.showModalScheduleMovies(this.props.selectedRoom, this.selectedMovie) }}
                    >Actualizar</a>
                </div>
            </Modal>
        );
    }
}
export default ModalScheduleEditMovie;