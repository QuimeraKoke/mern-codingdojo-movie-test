import React from "react";
import HeaderComponent from "../../components/HeaderComponent";
import {withRouter} from "../../utils";
import ConnectionManager from "../../ConnectionManager";
import SweetAlert from "react-bootstrap-sweetalert";

class CreateReviewPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            name: "",
            rating: 1,
            review: "",
            error: "",
            success: "",
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

    createReview = async () => {
        const {rating, review} = this.state;
        let error = '';
        if (!review.trim().length > 10) {
            error = "The review should be at least 10 characters long"
        }

        if (error)
            this.setState({
                error: error
            })
        else {
            let connection = new ConnectionManager();
            let data = await connection.createReview(this.props.params.id, rating, review)

            if (data !== null)
                this.setState({
                    name: "",
                    rating: 1,
                    review: "",
                    error: "",
                    success: "You have been register successfully"
                });
            else
                this.setState({
                    error: "Error"
                });
        }
    }

    goBack = () => {
        this.props.navigate(`/movies/${this.props.params.id}/reviews/`);
    }

    onCloseModal = () => {
        this.setState({
            error: "",
            success: ""
        })
    }

    render() {
        let movieName = this.state.data ? this.state.data.name: "";
        let user = JSON.parse(localStorage.getItem("user"));
        return (
            <>
                {this.state.error !== "" ?
                    <SweetAlert
                        title={"Error"}
                        danger
                        onConfirm={this.onCloseModal}
                    >
                        {this.state.error}
                    </SweetAlert> : null
                }
                {this.state.success !== "" ?
                    <SweetAlert
                        title={"Success"}
                        success
                        onConfirm={() => {
                            this.onCloseModal();
                            this.goBack();
                        }}
                    >
                        {this.state.success}
                    </SweetAlert> : null
                }
                <HeaderComponent />
                <div className="container" >
                    <div className="row">
                        <div className="col-12">
                            <div className="row justify-content-between">
                                <div className="col col-12">
                                    <h1>Submit a Review for {movieName}</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-8">
                                    <small style={{color: "red", fontWeight: "bold", background: "white"}}>{this.state.error}</small>
                                    <div className="form-group">
                                        <label htmlFor="username">Your name</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="username"
                                            id="username"
                                            required
                                            readOnly
                                            value={`${user.firstName} ${user.lastName}`}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="rating">Rating</label>
                                        <select className="form-control" id="rating" name="rating" value={this.state.rating} onChange={(event)=> {
                                            this.setState({
                                                rating: parseInt(event.target.value)
                                            })
                                        }}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="review">Review</label>
                                        <textarea className="form-control" id="review" rows="3" value={this.state.review} onChange={ (event) => {
                                            this.setState({
                                                review: event.target.value
                                            })
                                        }}></textarea>
                                    </div>
                                    <button className="btn btn-primary mr-5" onClick={this.createReview}>Create</button>
                                    <button className="btn btn-danger" onClick={this.goBack}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default CreateReviewPage = withRouter(CreateReviewPage);
