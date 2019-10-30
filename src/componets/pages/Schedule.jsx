const Queries = require('../../common/Queries.js');
import React, { Component } from 'react';
import Helpers from '../../common/Helpers.js';
import Storage from '../../common/Storage.js';
import ScheduleRoom from '../partials/ScheduleRoom.jsx';
import '../../assets/styles/Schedule.scss';


export default class Schedule extends Component {

    state = {
        theaters: [],
        periods: [],
        schedule: null
    }

    constructor(props) {
        super(props);
    }

    getAllTheater = async () => {
        try {
            let method = 'getAllTheater';
            let token = Storage.tokenSession;
            let query = Queries.getQuery(method, { token });
            let result = await Helpers.post(query);
            if (!result.status) {
                Helpers.showAlertError(result.message)
            } else if (!result.data[method].status) {
                Helpers.showAlertError(result.message)
            } else {
                this.setState({
                    theaters: result.data[method].data.reverse()
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    getAllPeriod = async () => {
        try {
            let method = 'getAllPeriod';
            let token = Storage.tokenSession;
            let query = Queries.getQuery(method, { token });
            let result = await Helpers.post(query);
            if (!result.status) {
                Helpers.showAlertError(result.message)
            } else if (!result.data[method].status) {
                Helpers.showAlertError(result.message)
            } else {
                this.setState({
                    periods: result.data[method].data.reverse()
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    getOneSchedule = async () => {
        try {

            let fields = ['ddlTheater', 'ddlPeriod'];
            if (!Helpers.validateFields(fields)) {
                //this.closeLoading();
                return;
            }

            let idTheater = Helpers.getValue('ddlTheater');
            let idPeriod = Helpers.getValue('ddlPeriod');

            if (idTheater === '0' || idPeriod === '0')
                return;

            console.log(idTheater)
            console.log(idPeriod)

            let method = 'getOneSchedule';
            let token = Storage.tokenSession;
            let query = Queries.getQuery(method, { token, idTheater, idPeriod });
            let result = await Helpers.post(query);
            if (!result.status) {
                Helpers.showAlertError(result.message)
            } else if (!result.data[method].status) {
                Helpers.showAlertError(result.message)
            } else {
                console.log(result.data[method].data);
                let data = this.processScheduleResult(result.data[method].data);
                console.log(data);
                // this.setState({
                //     schedule: result.data[method]
                // });
            }
        } catch (error) {
            console.log(error);
        }
    }

    processScheduleResult = (data) => {
        return {
            ...data,
            rooms: data.rooms.map(r => {
                return {
                    ...r,
                    movies: r.movies.map(m => {
                        return {
                            ...m,
                            startAt: Helpers.convertDate(m.startAt, true),
                            endAt: Helpers.convertDate(m.endAt, true)
                        }
                    })
                }
            })
        }
    }

    componentDidMount = async () => {
        try {

            await this.getAllPeriod();
            await this.getAllTheater();
            this.getOneSchedule();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let ddStyle = {
            display: 'block'
        }
        return (
            <div>
                <div className="divTitle">
                    Programación
                </div>
                <div className="row">
                    <div className="col s12 l5">
                        <label>Teatro</label>
                        <select id="ddlTheater" name="Teatro" style={ddStyle} onChange={this.getOneSchedule}>
                            <option value="0">--- Seleccione un Teatro ---</option>
                            {
                                this.state.theaters.map((theater, index) => {
                                    return (
                                        <option key={index} value={theater._id}>{theater.nombre}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="col s12 l5">
                        <label>Período</label>
                        <select id="ddlPeriod" name="Periodo" style={ddStyle} onChange={this.getOneSchedule}>
                            {
                                this.state.periods.map((period, index) => {
                                    return (
                                        <option key={index} value={period._id}>{`${Helpers.convertDate(period.dateFrom)} - ${Helpers.convertDate(period.dateUp)} (${period.flag})`}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="col s12 l2 right-align">
                        <a className="waves-effect waves-light btn-small">Guardar</a>
                    </div>
                </div>
                <div className="divDivider"></div>
                <div className="divScheduleRoomMain">
                    <ScheduleRoom room="Sala 1" />
                    <ScheduleRoom room="Sala 2" />
                    <ScheduleRoom room="Sala 3" />
                    <ScheduleRoom room="Sala 4" />
                    <ScheduleRoom room="Sala 5" />
                    <ScheduleRoom room="Sala 6" />
                    <ScheduleRoom room="Sala 7" />
                </div>
            </div>
        );
    }
}
