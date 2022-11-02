import React from "react";
import HeaderComponent from "../../components/HeaderComponent";
import TableComponent from "../../components/TableComponent";
import {withRouter} from "../../utils";
import ConnectionManager from "../../ConnectionManager";

class MovieReviewPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    async componentDidMount() {
        let connection = new ConnectionManager();
        let response = await connection.getMovie(this.props.params.id);
        if (response) {
            this.setState({status: "", data: response.data})
        } else {
            this.setState({status: "error", error: "There ahs been an error in the connection to the server"})
        }
    }

    deleteMovie = async () => {
        let connection = new ConnectionManager();
        let response = await connection.deleteMovie(this.props.params.id);
        if (response) {
            this.props.navigate("/movies/");
        } else {
            this.setState({status: "error", error: "There ahs been an error in the connection to the server"})
        }
    }

    deleteReview = async (reviewId) => {
        let connection = new ConnectionManager();
        let response = await connection.deleteReview(this.props.params.id, reviewId);
        if (response) {
            let response = await connection.getMovie(this.props.params.id);
            if (response) {
                this.setState({status: "", data: response.data})
            } else {
                this.setState({status: "error", error: "There ahs been an error in the connection to the server"})
            }
        } else {
            this.setState({status: "error", error: "There ahs been an error in the connection to the server"})
        }
    }


    render = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        let proccessData = this.state.data.review ? this.state.data.review.map(r => {
            return {
                id: r.id,
                rating: r.rating,
                review: r.review,
                reviewer: `${r.user.firstName} ${r.user.lastName}`,
                delete: r.user.id === user.id

            }
        }) : []
        let movieName = this.state.data ? this.state.data.name: "";
        return (
            <>
                <HeaderComponent />
                <div className="container" >
                    <div className="row">
                        <div className="col-12">
                            <div className="row justify-content-between">
                                <div className="col col-12">
                                    <h1 className="mb-5">Review for movie: {movieName}</h1>
                                </div>

                            </div>
                            <div className="row">
                                <TableComponent
                                    keys={["reviewer", "rating", "review"]}
                                    data={proccessData}
                                    actions={[]}
                                    actionsHandler={[]}
                                    deleteObject={this.deleteReview}
                                />
                                <button className="btn btn-danger" onClick={this.deleteMovie}>Delete Movie</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default MovieReviewPage = withRouter(MovieReviewPage);