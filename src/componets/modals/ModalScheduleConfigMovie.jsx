import React, { Component } from 'react';
import Modal from './Modal.jsx';
import Helpers from '../../common/Helpers.js';
import Storage from '../../common/Storage.js';
import '../../assets/styles/ModalScheduleConfigMovie.scss';
const Queries = require('../../common/Queries.js');


class ModalScheduleConfigMovie extends Component {
    state = {
        scheduleAttributes: []
    };

    selectedMovies = new Array();

    constructor(props) {
        super(props);
        this.selectedMovies = this.props.selectedMovies;
    }

    componentDidMount = () => {
        this.getAllScheduleAttribute();
    }

    getCleaningTime = (idMovieFormat) => {
        let objSupportedFormat = this.props.selectedRoom.supportedFormats.filter(supportedFormat => {
            if (supportedFormat.idMovieFormat.toString() === idMovieFormat)
                return supportedFormat;
        });
        if (objSupportedFormat && objSupportedFormat.length > 0)
            return objSupportedFormat[0].cleaningTime;
        else
            return 0;
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

    getTotalDuration = (idParentElement) => {
        let inputStartAt = document.getElementById(`timeStartAt_${idParentElement}`).value;
        let inputEndAt = document.getElementById(`timeEndAt_${idParentElement}`);
        if (Helpers.isNullOrEmpty(inputStartAt)) {
            for (let i in this.selectedMovies) {
                if (this.selectedMovies[i]._id === idParentElement) {
                    delete this.selectedMovies[i].scheduleAttributes;
                    delete this.selectedMovies[i].startAt;
                    delete this.selectedMovies[i].endAt;
                    delete this.selectedMovies[i].cleaningTime;
                    break;
                }
            }
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
        this.state.scheduleAttributes.forEach(sa => {
            elementScheduleAttribute = document.getElementById(`${idParentElement}_${sa._id}`).value;
            elementScheduleAttribute = parseInt(elementScheduleAttribute);
            if (elementScheduleAttribute) {
                minutes = minutes + parseInt(elementScheduleAttribute);
                tempScheduleAttributes.push({
                    idScheduleAttribute: sa._id,
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

        let paramsUpdateSelectedMovies = {
            idMovie: idParentElement,
            scheduleAttributes: tempScheduleAttributes,
            cleaningTime: parseInt(inputCleaningTime),
            startAt: startDate,
            endAt: endDate
        }
        this.updateSelectedMovies(paramsUpdateSelectedMovies);
    }

    updateSelectedMovies = (params) => {
        let newSelectedMovies = this.selectedMovies.map(sm => {
            if (sm._id === params.idMovie) {
                return {
                    ...sm,
                    scheduleAttributes: params.scheduleAttributes,
                    cleaningTime: params.cleaningTime,
                    startAt: params.startAt,
                    endAt: params.endAt
                }
            }
            return sm;
        });
        this.selectedMovies = newSelectedMovies;
    }

    addMovies = () => {
        debugger;
        let selectedMovies = new Array();
        this.selectedMovies.forEach(sm => {
            if (!Helpers.isNullOrEmpty(sm.scheduleAttributes)) {
                selectedMovies.push({
                    idMovie: sm._id,
                    movieName: sm.movieName,
                    scheduleAttributes: sm.scheduleAttributes,
                    startAt: sm.startAt,
                    endAt: sm.endAt,
                    cleaningTime: sm.cleaningTime
                });
            }
        });
        this.props.addMovies(this.props.selectedRoom, selectedMovies);
    }

    render() {
        return (
            <Modal
                title="Configurar Películas"
                hideModal={this.props.hideModal}
            >
                <div className="divModalScheduleConfigMovie">
                    {
                        this.props.selectedMovies.map((movie, index) => {
                            return (
                                <div
                                    className="divModalScheduleConfigMovieMovie"
                                    key={index}
                                    id={`divMovie_${movie._id}`}>
                                    <div id={`divMovieName_${movie.movieName}`} className="divScheduleConfigMovieMovie">{movie.movieName}</div>
                                    <div className="divScheduleConfigMovieTime"><span>Hora de inicio</span><input type="time" className="inputScheduleConfigMovie" id={`timeStartAt_${movie._id}`} onChange={() => this.getTotalDuration(movie._id)} /></div>
                                    {
                                        this.state.scheduleAttributes.length > 0 &&
                                        this.state.scheduleAttributes.map((sa, sa_index) => {
                                            return (
                                                <div
                                                    key={sa_index}
                                                    className="divScheduleConfigMovieOthers">{sa.scheduleAttributeName} <input type="number" id={`${movie._id}_${sa._id}`} className="inputScheduleConfigMovie" defaultValue={sa.defaultDuration} onChange={() => this.getTotalDuration(movie._id)} /></div>
                                            );
                                        })
                                    }
                                    <div className="divScheduleConfigMovieOthers">Duración <input type="number" id={`numberMovieDuration_${movie._id}`} className="inputScheduleConfigMovie" defaultValue={movie.duration} disabled /></div>
                                    <div className="divScheduleConfigMovieOthers">Limpieza <input type="number" id={`numberMovieCleaning_${movie._id}`} className="inputScheduleConfigMovie" disabled defaultValue={this.getCleaningTime(movie.idMovieFormat)} /></div>
                                    <div className="divScheduleConfigMovieTime">Hora Finalización <input type="time" id={`timeEndAt_${movie._id}`} className="inputScheduleConfigMovie" disabled /></div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="col s12 l2 right-align">
                    <a
                        className="waves-effect waves-light btn-small"
                        id="btnNext"
                        onClick={this.addMovies}
                    >Agregar</a>
                </div>
            </Modal>
        );
    }
}
export default ModalScheduleConfigMovie;