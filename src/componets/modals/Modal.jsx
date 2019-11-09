import React, { Component } from 'react';
import '../../assets/styles/Modal.scss';

class Modal extends Component {
    state = {

    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="divModalMain" className="container">
                <div id="divModalCenter">
                    <div id="divModalTitle">
                        <h5 id="modalTitle" >{this.props.title}</h5>
                    </div>
                    <div id="divModalBtnClose" onClick={this.props.hideModal}>
                        X
                    </div>
                    <div id="divModalContent">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;