import React, { Component } from 'react';
import Storage from '../../common/Storage.js';
import ScheduleRoom from '../partials/ScheduleRoom.jsx';
import '../../assets/styles/Common.scss';


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
                <div className="row">
                    <div className="col l12">
                        <div className="card-content valign center-block">
                            <h5>Programación</h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col l6">
                        <label>Teatro</label>
                        <select id="ddlTeather" name="Teatro" style={ddStyle}>
                            <option value="0">Seleccione un Teatro</option>
                            <option value="1">Mayorca</option>
                            <option value="2">Aves María</option>
                        </select>
                    </div>
                    <div className="col l6">
                        <label>Fechas</label>
                        <select id="ddlDates" name="Fechas" style={ddStyle}>
                            <option value="0">Seleccione un rango de fechas</option>
                            <option value="1">14/10/2019 - 20/10/2019</option>
                            <option value="1">07/10/2019 - 13/10/2019</option>
                        </select>
                    </div>
                    {/* <div className="col l4">
                        <label>Fecha Inicial</label>
                        <input type="date" id="dateDateStart" name="Fecha Inicial"></input>
                    </div>
                    <div className="col l4">
                        <label>Fecha Final</label>
                        <input type="date" id="dateDateEnd" name="Fecha Inicial"></input>
                    </div> */}
                </div>
                <ScheduleRoom />
            </div>
        );
    }
}
