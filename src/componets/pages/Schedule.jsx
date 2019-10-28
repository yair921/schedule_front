import React, { Component } from 'react';
import Storage from '../../common/Storage.js';
import ScheduleRoom from '../partials/ScheduleRoom.jsx';
import '../../assets/styles/Schedule.scss';
//import '../../assets/styles/Common.scss';


export default class Schedule extends Component {
    constructor(props) {
        super(props);
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
                        <select id="ddlTeather" name="Teatro" style={ddStyle}>
                            <option value="0">Seleccione un Teatro</option>
                            <option value="1">Mayorca</option>
                            <option value="2">Aves María</option>
                        </select>
                    </div>
                    <div className="col s12 l5">
                        <label>Período</label>
                        <select id="ddlDates" name="Fechas" style={ddStyle}>
                            <option value="0">Seleccione un período</option>
                            <option value="1">14/10/2019 - 20/10/2019</option>
                            <option value="1">07/10/2019 - 13/10/2019</option>
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
