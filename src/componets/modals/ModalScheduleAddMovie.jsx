import React, { Component } from 'react';
import Modal from './Modal.jsx';
import Helpers from '../../common/Helpers.js';
import Storage from '../../common/Storage.js';
import '../../assets/styles/ModalScheduleAddMovie.scss';
const Queries = require('../../common/Queries.js');


class ModalScheduleAddMovie extends Component {
    state = {
        movies: []
    };

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.getAllMovie();
    }

    getAllMovie = async () => {
        try {
            console.log(this.props.supportedFormats);
            let supportedFormats = this.props.supportedFormats;
            let method = 'getAllMovie';
            let token = Storage.tokenSession;
            let query = Queries.getQuery(method, { token });
            let result = await Helpers.post(query);
            if (!result.status) {
                Helpers.showAlertError(result.message)
            } else if (!result.data[method].status) {
                Helpers.showAlertError(result.message)
            } else {
                let moviesFilters = result.data[method].data.filter(f => {
                    for (let i in supportedFormats) {
                        if (f.idMovieFormat ===supportedFormats[i].idMovieFormat){
                            return f;
                        }
                    }
                });
                // this.setState({
                //     movies: result.data[method].data
                // });
                console.log(moviesFilters);
                //debugger;
                this.setState({
                    movies: moviesFilters
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <Modal
                title="Agregar Películas"
                hideModal={this.props.hideModal}
            >
                <div>
                    {
                        this.state.movies.map((movie, index) => {
                            return (<div key={index} className="divModalScheduleAddMovieMovie">{movie.movieName}</div>)
                        })
                    }
                </div>
            </Modal>
        );
    }
}
export default ModalScheduleAddMovie;