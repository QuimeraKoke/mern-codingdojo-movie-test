import React from "react";
import {validateEmail} from "../utils";
import ConnectionManager from "../ConnectionManager";
import SweetAlert from 'react-bootstrap-sweetalert';

export default class RegisterComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password2: "",
            error: "",
            success: "",
        }
    }

    register = async () => {
        const {firstName, lastName, email, password, password2} = this.state;
        let error = "";

        if (!firstName.trim() || !lastName.trim()) {
            error = "You must enter a first name and last name";
        }

        if (!email.trim() && !validateEmail(email.trim())) {
            error = "You must enter a valid email";
        }

        if (!password.trim() || !password2.trim()) {
            error = "You must enter a password";
        }

        if (password !== password2) {
            error = "The passwords didn't match";
        }

        if (error) {
            this.setState({
                error
            });
        } else {
            let connection = new ConnectionManager();
            let data = await connection.register({firstName, lastName, email, password})

            if (data !== null)
                this.setState({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    password2: "",
                    success: "You have been register successfully"
                });
            else
                this.setState({
                    error: "Your user already exist"
                });
        }
    }

    onCloseModal = () => {
        this.setState({
            error: "",
            success: ""
        })
    }


    render() {
        return (
            <div>
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
                        }}
                    >
                        {this.state.success}
                    </SweetAlert> : null
                }
                <h1 className="text-center">Register</h1>
                <p>Just some info and we are ready to go.</p>
                <div>
                    <small style={{background: "white", color: "red"}}></small>
                    <div className="form-group">
                        <label htmlFor="first_name">First name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="firstName"
                            id="first_name" required
                            value={this.state.firstName}
                            onChange={(event) => {
                                this.setState({
                                    firstName : event.target.value
                                })
                            }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name">Last name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="lastName"
                            id="last_name" required
                            value={this.state.lastName}
                            onChange={(event) => {
                                this.setState({
                                    lastName : event.target.value
                                })
                            }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            id="email"
                            value={this.state.email}
                            onChange={(event) => {
                                this.setState({
                                    email: event.target.value
                                })
                            }}/>
                    </div>
                </div>
                <div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            id="password"
                            value={this.state.password}
                            onChange={(event) => {
                                this.setState({
                                    password: event.target.value
                                })
                            }}/>
                    </div>
                </div>
                <div>
                    <div className="form-group">
                        <label htmlFor="password2">Confirm password</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password2"
                            id="password2"
                            value={this.state.password2}
                            onChange={(event) => {
                                this.setState({
                                    password2 : event.target.value
                                })
                            }}/>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={this.register}>Register</button>
            </div>
        )
    }
}