const Queries = require('../../common/Queries.js');
import React, { Component } from 'react';
import Helpers from '../../common/Helpers.js';
import Storage from '../../common/Storage.js';
import ScheduleRoom from '../partials/ScheduleRoom.jsx';
import ModalScheduleAddMovie from '../modals/ModalScheduleAddMovie.jsx';
import ModalScheduleConfigMovie from '../modals/ModalScheduleConfigMovie.jsx';
import ModalScheduleEditMovie from '../modals/ModalScheduleEditMovie.jsx';
import '../../assets/styles/Schedule.scss';


export default class Schedule extends Component {

    state = {
        theaters: [],
        periods: [],
        schedule: [],
        rooms: [],
        selectedRoom: {},
        selectedMovies: [],
        selectedMovies: {},
        viewModalScheduleAddMovies: false,
        viewModalScheduleConfigMovies: false,
        viewModalScheduleEditMovie: false
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

    getAllRoom = async () => {
        try {
            let method = 'getAllRoom';
            let token = Storage.tokenSession;
            let query = Queries.getQuery(method, { token });
            let result = await Helpers.post(query);
            if (!result.status) {
                Helpers.showAlertError(result.message)
            } else if (!result.data[method].status) {
                Helpers.showAlertError(result.message)
            } else {
                return result.data[method].data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    getOneSchedule = async () => {
        try {
            let fields = ['ddlTheater', 'ddlPeriod'];
            if (!Helpers.validateFields(fields)) {
                return;
            }

            let idTheater = Helpers.getValue('ddlTheater');
            let idPeriod = Helpers.getValue('ddlPeriod');

            if (idTheater === '0' || idPeriod === '0')
                return;

            let method = 'getOneSchedule';
            let token = Storage.tokenSession;
            let query = Queries.getQuery(method, { token, idTheater, idPeriod });
            let result = await Helpers.post(query);
            if (!result.status) {
                Helpers.showAlertError(result.message)
            } else if (!result.data[method].status) {
                Helpers.showAlertError(result.message)
            } else if (Helpers.isNullOrEmpty(result.data[method].data)) {
                this.setState({
                    schedule: [],
                    rooms: []
                });
            } else {
                let data = this.processScheduleResult(result.data[method].data);
                this.setState({
                    schedule: data,
                    rooms: data.rooms
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    processScheduleResult = (data) => {
        data.rooms.map(r => {
            return r.movies.sort(Helpers.sortObject('startAt'));
        });
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

    showModalScheduleAddMovies = (room) => {
        this.setState({
            viewModalScheduleAddMovies: true,
            selectedRoom: room
        });
    }

    hideModalScheduleAddMovies = () => {
        this.setState({
            viewModalScheduleAddMovies: false
        });
    }

    showModalScheduleConfigMovies = (room, movies) => {
        if (movies.length === 0) {
            Helpers.showAlertError('Please select one or more movies.');
            return;
        }
        this.setState({
            viewModalScheduleAddMovies: false,
            viewModalScheduleConfigMovies: true,
            selectedRoom: room,
            selectedMovies: movies
        });
    }

    hideModalScheduleConfigMovies = () => {
        this.setState({
            viewModalScheduleConfigMovies: false
        });
    }

    showModalScheduleEditMovie = (idElementMovie) => {
        let ids = idElementMovie.split('_');
        let idRoom = ids[0];
        let idMovie = ids[1];

        let roomSelected = this.state.schedule.rooms.filter(room => {
            return room.idRoom === idRoom;
        })[0];

        let movieSeleted = roomSelected.movies.filter(movie => {
            return movie.idMovie === idMovie
        })[0];
        
        this.setState({
            viewModalScheduleEditMovie: true,
            selectedRoom: roomSelected,
            selectedMovie: movieSeleted
        });
    }

    hideModalScheduleEditMovie = () => {
        this.setState({
            viewModalScheduleEditMovie: false
        });
    }

    addMovies = (selectedRoom, selectedMovies) => {
        if (Helpers.isNullOrEmpty(selectedMovies)
            || Helpers.isNullOrEmpty(selectedMovies[0])) {
            this.setState({
                viewModalScheduleConfigMovies: false,
            });
            return;
        }

        let newRooms = this.state.schedule.rooms.map(r => {
            if (r.idRoom === selectedRoom.idRoom) {
                return {
                    ...r,
                    movies: r.movies.concat(selectedMovies)
                }
            }
            return r;
        });
        newRooms.map(r => {
            return r.movies.sort((a, b) => a.startAt - b.startAt);
        });
        this.setState({
            viewModalScheduleConfigMovies: false,
            schedule: {
                ...this.state.schedule,
                rooms: newRooms
            }
        });
    }

    saveSchedule = () => {
        let newRooms = this.state.schedule.rooms.map(room => {
            return {
                idRoom: room.idRoom,
                movies: room.movies.map(movie => {
                    return {
                        idMovie: movie.idMovie,
                        scheduleAttributes: movie.scheduleAttributes,
                        cleaningTime: movie.cleaningTime,
                        startAt: movie.startAt.toISOString(),
                        endAt: movie.endAt.toISOString()
                    }
                })
            }
        });
        if (Helpers.isNullOrEmpty(this.state.schedule._id)) {
            this.add(newRooms);
        } else {
            // update
        }
    }

    add = async (rooms) => {
        try {
            //this.handleLoading();
            let method = 'addSchedule';
            let token = Storage.tokenSession;
            let idTheater = this.state.schedule.idTheater;
            let idPeriod = this.state.schedule.idPeriod;
            let query = Queries.getQuery(method, { token, idTheater, idPeriod, rooms: JSON.stringify(rooms) });
            query = query.replace(/\"([^(\")"]+)\":/g, "$1:");
            //console.log(query);
            let result = await Helpers.post(query);
            if (!result.status) {
                //this.closeLoading();
                Helpers.showAlertError(result.message);
            } else if (!result.data[method].status) {
                //this.closeLoading();
                Helpers.showAlertError(result.data[method].message);
            } else {
                //this.closeLoading();
                console.log(result);
                this.setState({
                    schedule: {
                        ...this.state.schedule,
                        _id: result.data[method]._id
                    }
                });
                Helpers.showAlertAdd();
            }
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
                {
                    this.state.viewModalScheduleAddMovies ?
                        <ModalScheduleAddMovie
                            hideModal={this.hideModalScheduleAddMovies}
                            selectedRoom={this.state.selectedRoom}
                            showModalScheduleConfigMovies={this.showModalScheduleConfigMovies}
                        />
                        : null
                }
                {
                    this.state.viewModalScheduleConfigMovies ?
                        <ModalScheduleConfigMovie
                            hideModal={this.hideModalScheduleConfigMovies}
                            selectedRoom={this.state.selectedRoom}
                            selectedMovies={this.state.selectedMovies}
                            addMovies={this.addMovies}
                        />
                        : null
                }
                {
                    this.state.viewModalScheduleEditMovie ?
                        <ModalScheduleEditMovie
                            hideModal={this.hideModalScheduleEditMovie}
                            selectedRoom={this.state.selectedRoom}
                            selectedMovie={this.state.selectedMovie}
                            showModalScheduleEditMovie={this.showModalScheduleEditMovie}
                        />
                        : null
                }

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
                        <a className="waves-effect waves-light btn-small" onClick={this.saveSchedule}>Guardar</a>
                    </div>
                </div>
                <div className="divDivider"></div>
                <div className="divScheduleRoomMain">
                    {
                        (this.state.rooms.length > 0) ?
                            this.state.schedule.rooms.map((room, index) => {
                                return (
                                    <ScheduleRoom
                                        key={index}
                                        room={room}
                                        showModalScheduleAddMovies={this.showModalScheduleAddMovies}
                                        showModalScheduleConfigMovies={this.showModalScheduleConfigMovies}
                                        showModalScheduleEditMovie={this.showModalScheduleEditMovie}
                                    />
                                );
                            })
                            : null
                    }
                </div>
            </div>
        );
    }
}
