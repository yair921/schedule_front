import React, { Component } from 'react';
import '../../assets/styles/Header.scss'

class Header extends Component {

    onRef = nav => {
        this.nav = nav;
        M.Sidenav.init(nav);
    };

    state = {

    };

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <ul id="dropdown1" className="dropdown-content">
                    <li><a href="#/schedule">Programación</a></li>
                    <li><a href="#!">two</a></li>
                    <li className="divider"></li>
                    <li><a href="#!">three</a></li>
                </ul>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#/welcome" className="brand-logo">Schedule</a>
                        <a href="#" data-target="responsive-menu" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>

                        <ul ref={this.onRef} className="sidenav" id="responsive-menu">
                            <li><a href="#">Programación</a></li>
                            <li><a href="#">Teatros</a></li>
                            <li><a href="#">Películas</a></li>
                            <li><a href="#">Usuarios</a></li>
                            <li><a className="dropdown-trigger" href="#" data-target="dropdown1">Programación<i className="material-icons right">arrow_drop_down</i></a></li>
                        </ul>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="#/schedule">Programación</a></li>
                            <li><a href="#">Teatros</a></li>
                            <li><a href="#">Películas</a></li>
                            <li><a href="#">Usuarios</a></li>
                            <li><a className="dropdown-trigger" href="#" data-target="dropdown1">Programación<i className="material-icons right">arrow_drop_down</i></a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;