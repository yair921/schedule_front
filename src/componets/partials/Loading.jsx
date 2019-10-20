import React from 'react';
import '../../assets/styles/Loading.scss';

class Loading extends React.Component {

    state = {};
    
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.visible) {
            return (
                <div className="divLoadingContain">
                    <div className="divLoadingCentral">
                        <img alt="Loading..." src="../../public/gifs/loading.gif" />
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Loading;