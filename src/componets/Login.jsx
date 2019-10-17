import React from 'react';
import '../assets/styles/Login.scss';

class Login extends React.Component {

    // state = {
    //     redirect: true,
    //     showLoading: false
    // };

    constructor(props) {
        super(props);
    }

    // login = async () => {
    //     if (!this.validateFields())
    //         return;
    //     this.handleLoading();

    //     let args = {
    //         url: Config.urls.login,
    //         body: JSON.stringify({
    //             ...Config.login,
    //             email: document.getElementById('txtUser').value,
    //             password: document.getElementById('txtPassword').value,
    //         })
    //     };

    //     try {
    //         let result = await Helpers.post(args);
    //         Auth.login(result);
    //         if (Auth.isAuthenticated) {
    //             this.props.history.push('/cases');
    //         } else {
    //             this.closeLoading();
    //             Swal.fire({
    //                 type: 'error',
    //                 title: 'Oops...',
    //                 text: t('login-alert-errorlogin')
    //             });
    //         }
    //     } catch (error) {
    //         this.closeLoading();
    //         Swal.fire({
    //             type: 'error',
    //             title: 'Oops...',
    //             text: t('message-error')
    //         });
    //         console.log(error);
    //     }
    // }

    // validateFields = () => {
    //     let user = document.getElementById('txtUser').value;
    //     let password = document.getElementById('txtPassword').value;
    //     if (Helpers.isNullOrEmpty(user) || Helpers.isNullOrEmpty(password)) {
    //         Swal.fire({
    //             type: 'error',
    //             title: 'Oops...',
    //             text: t('message-error-fields')
    //         });
    //         return false
    //     } else {
    //         return true;
    //     }
    // }

    // handleLoading = () => {
    //     this.setState({
    //         showLoading: true
    //     });
    // }

    // closeLoading = () => {
    //     this.setState({
    //         showLoading: false
    //     });
    // }

    render() {
        return (
            <div id="divLogin">
                {/* <Loading visible={this.state.showLoading} /> */}
                <div className="row mt-6">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <div id="divLoginInside">
                            {/* <img alt="Risk Hunter" src="../../assets/images/rh.png" className="imgLogin" /> */}
                            <h3 id="titleLogin" className="text-center">Schedule</h3>
                            <label className="mt-3">User</label>
                            <input type="text" id="txtUser" className="form-control" ></input>
                            <label className="mt-3">Password</label>
                            <input type="password" id="txtPassword" className="form-control" ></input>
                            <button type="button" id="btnLogin" className="btn btn-primary btn-block mt-4" /*onClick={this.login}*/>
                                <span className="fas fa-sign-in-alt"></span>&nbsp;
                                Enter
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        );
    }
}

export default Login;