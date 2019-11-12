import React, { Component } from 'react';
import Modal from './Modal.jsx';
import Helpers from '../../common/Helpers.js';
import Storage from '../../common/Storage.js';
import '../../assets/styles/ModalScheduleAddMovie.scss';
const Queries = require('../../common/Queries.js');


class ModalScheduleAddMovie extends Component {
    state = {
        movies: [],
    };

    selectedMovies = [];

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.getAllMovie();
    }

    getAllMovie = async () => {
        try {
            let supportedFormats = this.props.selectedRoom.supportedFormats;
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
                        if (f.idMovieFormat === supportedFormats[i].idMovieFormat) {
                            return f;
                        }
                    }
                });
                moviesFilters.sort(Helpers.sortObject('movieName'));
                this.setState({
                    movies: moviesFilters
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    selectMovie = (movie) => {
        let index = null;
        let divMoviePosition;
        let element = document.getElementById(movie._id);
        this.selectedMovies.filter((item, i) => {
            if (item._id === movie._id) {
                index = i;
                return;
            }
        });
        if (index !== null && typeof index !== 'undefined') {
            divMoviePosition = document.getElementById(`divMoviePosition_${this.selectedMovies[index]._id}`);
            divMoviePosition.innerHTML = '';
            this.selectedMovies.splice(index, 1);
            element.classList.remove('divModalScheduleAddMovieMovieSelected');
        } else {
            this.selectedMovies.push(movie);
            element.classList.add('divModalScheduleAddMovieMovieSelected');
        }
        this.selectedMovies.forEach((e, i) => {
            divMoviePosition = document.getElementById(`divMoviePosition_${e._id}`);
            divMoviePosition.innerHTML = i + 1;
        });
        //console.log(this.selectedMovies);
    }

    render() {
        return (
            <Modal
                title="Agregar Películas"
                hideModal={this.props.hideModal}
            >
                <div className="divModalScheduleAddMovie">
                    {
                        this.state.movies.map((movie, index) => {
                            return (
                                <div
                                    className="divModalScheduleAddMovieMovie"
                                    key={index}
                                    id={movie._id}
                                    onClick={() => { this.selectMovie(movie) }}>
                                    <div id={`divMoviePosition_${movie._id}`} className="divMoviePosition"></div>
                                    {movie.movieName}
                                </div>
                            );
                        })
                    }
                </div>
                <div className="col s12 l2 right-align">
                    <a
                        className="waves-effect waves-light btn-small"
                        id="btnNext"
                        onClick={() => { this.props.showModalScheduleConfigMovies(this.props.selectedRoom, this.selectedMovies) }}
                    >Agregar</a>
                </div>
            </Modal>
        );
    }
}
export default ModalScheduleAddMovie;