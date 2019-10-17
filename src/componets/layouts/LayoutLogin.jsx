import React from 'react';
//import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

function LayoutLogin(props) {
    return (
        <div>
            {/* <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.0.min.js"></script>
            <script src="../../node_modules/bootstrap/dist/js/bootstrap.min.js"></script> */}
            {props.children}
        </div>
    );
}

export default LayoutLogin;