import React from "react";
import HeaderComponent from "../../components/HeaderComponent";
import TableComponent from "../../components/TableComponent";
import {withRouter} from "../../utils";
import ConnectionManager from "../../ConnectionManager";

class MovieIndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            status: "loading",
        }
    }

    goToReviews = (movieId) => {
        let movie = this.state.data.find(d => d.id === movieId);
        this.props.navigate(`/movies/${movieId}/reviews`, movie);
    };

    writeReview = (movieId) => {
        let movie = this.state.data.find(d => d.id === movieId);
        this.props.navigate(`/movies/${movieId}/reviews/create/`);
    }

    createMovie = () => {
        this.props.navigate("/movies/create/");
    }

    async componentDidMount() {
        let connection = new ConnectionManager();
        let response = await connection.getMovies();
        if (response){
            this.setState({status: "", data: response.data})
        } else {
            this.setState({status: "error", error: "There ahs been an error in the connection to the server"})
        }
    }

    render = () => {
        let proccessData = this.state.data.map( d => {
            return {
                id: d.id,
                name: d.name,
                "avg. rating": d.review.length ? d.review.reduce((pv, cv) => pv + cv.rating, 0)/d.review.length : "-",
                delete: false,
            }
        });

        return (
                <>
                    <HeaderComponent/>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="row justify-content-between">
                                    <div className="col col-4">
                                        <h1 className="mb-5">Movie List</h1>
                                    </div>
                                    <div className="col col-2">
                                        <button className="btn btn-success" onClick={this.createMovie}>Crear</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <TableComponent
                                        keys={["name", "avg. rating"]}
                                        data={proccessData}
                                        actions={["Read Reviews", "Write a Review"]}
                                        actionsHandler={[this.goToReviews, this.writeReview]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
        )
    }
}

export default MovieIndexPage = withRouter(MovieIndexPage);