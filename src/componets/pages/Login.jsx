const Queries = require('../../common/Queries.js');
import React, { Component } from 'react';
import Helpers from '../../common/Helpers.js';
import Loading from '../partials/Loading.jsx';
import Storage from '../../common/Storage.js';
import '../../assets/styles/Login.scss';

class Login extends Component {

    state = {
        redirect: true,
        showLoading: false
    };

    constructor(props) {
        super(props);
    }

    /**
     * Method that execute the login.
     */
    login = async () => {
        this.handleLoading();
        let fields = ['txtUser', 'txtPassword'];
        if (!Helpers.validateFields(fields)) {
            this.closeLoading();
            return;
        }
        let userName = Helpers.getValue('txtUser');
        let password = Helpers.getValue('txtPassword');
        let query = Queries.getQuery('getLogin', { userName, password });
        let result = await Helpers.post(query);
        if (!result.status) {
            Helpers.showAlertError(result.message);
            this.closeLoading();
        } else if (!result.data.getLogin.status) {
            Helpers.showAlertError(result.data.getLogin.message);
            this.closeLoading();

        } else {
            Storage.setAuthentication(result.data.getLogin.token);
            this.props.history.push('/schedule');
        }
    }

    handleLoading = () => {
        this.setState({
            showLoading: true
        });
    }

    closeLoading = () => {
        this.setState({
            showLoading: false
        });
    }

    render() {
        let divLoginStyle = {
            backgroundImage: 'url(../../public/images/login.jpg)',
        };
        return (
            <div id="divLogin" style={divLoginStyle}>
                <Loading visible={this.state.showLoading} />
                <div className="row">
                    <div className="col l4"></div>
                    <div className="col l4">
                        <div id="divLoginInside">
                            <h3 id="titleLogin" >Schedule</h3>
                            <label>User</label>
                            <input type="text" id="txtUser" name="Usuario" ></input>
                            <label>Password</label>
                            <input type="password" id="txtPassword" name="Contraseña" ></input>
                            <button type="button" id="btnLogin" className="btn waves-effect waves-light" onClick={this.login}>
                                Enter
                            </button>
                        </div>
                    </div>
                    <div className="col l4"></div>
                </div>
            </div>
        );
    }
}

export default Login;
