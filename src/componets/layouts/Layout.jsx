import React from 'react';
import Header from '../partials/Header.jsx';

function Layout(props) {
    return (
        <div className="container">
            <Header />
            {props.children}
        </div>
    );
}

export default Layout;