import React from "react";
import HeaderComponent from "../../components/HeaderComponent";
import {withRouter} from "../../utils";
import SweetAlert from 'react-bootstrap-sweetalert';
import ConnectionManager from "../../ConnectionManager";

class CreateMoviePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            rating: 1,
            review: "",
            error: "",
            success: "",
        }
    }

    createMovie = async () => {
        const {name, review, rating} = this.state;
        let error = "";

        if (!name.trim()) {
            error = "Movie title is required"
        }

        if (review.trim().length < 10) {
            error = "The review should be at least 10 characters long"
        }

        if (error !== "") {
            this.setState({
                error: error
            })
        } else {
            let connection = new ConnectionManager();
            let data = await connection.createMovie(name, rating, review)

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
        this.props.navigate("/movies/");
    }

    onCloseModal = () => {
        this.setState({
            error: "",
            success: ""
        })
    }

    render() {
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
                                <div className="col col-4">
                                    <h1>Create Movie</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-8">
                                    <small style={{color: "red", fontWeight: "bold", background: "white"}}>If the movie already exist the system will just add your review</small>
                                    <div className="form-group">
                                        <label htmlFor="title">Movie title</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="title"
                                            id="title" required
                                            value={this.state.name}
                                            onChange={(event) => {
                                                this.setState({
                                                    name : event.target.value
                                                })
                                            }}/>
                                    </div>
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
                                    <button className="btn btn-primary mr-2" onClick={this.createMovie}>Create</button>
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

export default CreateMoviePage = withRouter(CreateMoviePage);