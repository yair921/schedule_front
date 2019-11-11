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

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.getAllScheduleAttribute();
    }

    getAllScheduleAttribute = async () => {
        try {
            //debugger
            let method = 'getAllScheduleAttribute';
            let token = Storage.tokenSession;
            let query = Queries.getQuery(method, { token });
            let result = await Helpers.post(query);
            if (!result.status) {
                Helpers.showAlertError(result.message)
            } else if (!result.data[method].status) {
                Helpers.showAlertError(result.message)
            } else {
                //console.log(result);
                this.setState({
                    scheduleAttributes: result.data[method].data
                });
            }
        } catch (error) {
            console.log(error);
        }
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
                                    id={movie._id}>
                                    <div className="divScheduleConfigMovieMovie">{movie.movieName}</div>
                                    <div className="divScheduleConfigMovieTime"><span>Hora de inicio</span><input type="time" id="inputStartAt" /></div>
                                    <div className="divScheduleConfigMovieOthers">Duración: <input type="number" id="inputDuration" /></div>
                                    {
                                        this.state.scheduleAttributes.length > 0 &&
                                        this.state.scheduleAttributes.map((m, index) => {
                                            return (
                                                <div 
                                                key={index} 
                                                className="divScheduleConfigMovieOthers">{m.scheduleAttributeName}: <input type="number" id={m._id} defaultValue={m.defaultDuration} /></div>
                                            );
                                        })
                                    }
                                    <div className="divScheduleConfigMovieTime">Hora Finalización <input type="time" id="inputEndAt" /></div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="col s12 l2 right-align">
                    <a
                        className="waves-effect waves-light btn-small"
                        id="btnNext"
                    >Agregar</a>
                </div>
            </Modal>
        );
    }
}
export default ModalScheduleConfigMovie;