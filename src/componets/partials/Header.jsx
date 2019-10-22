import React, { Component } from 'react';

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
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Schedule</a>
                    <a href="#" data-target="responsive-menu" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>

                    <ul ref={this.onRef} className="sidenav" id="responsive-menu">
                        <li><a href="#">Teatros</a></li>
                        <li><a href="#">Películas</a></li>
                        <li><a href="#">Usuarios</a></li>
                    </ul>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="#">Teatros</a></li>
                        <li><a href="#">Películas</a></li>
                        <li><a href="#">Usuarios</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;