import React from 'react';
//import { Redirect } from 'react-router-dom';
import '../assets/styles/Notfound.scss';

const NotFound = () => {
    return (

        <div className="container">
            <div id="divNotFound">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 id="titleNotFoundMain" className="text-center">404</h1>
                    </div>
                    <div className="col-lg-12">
                        <h4 id="titleNotFound" className="text-center">Page not found!</h4>
                    </div>
                    <div className="col-lg-12 text-center">
                        <p>The requested page does not exist</p>
                    </div>
                    <div className="col-lg-12">
                        <button className="btn btn-block btn-outline-secondary" onClick={gotToHomePage}>Go to home page</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const gotToHomePage = () => {
    window.location.href = '/'
}

export default NotFound;