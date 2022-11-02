import React from "react";
import {validateEmail, withRouter} from "../utils";
import ConnectionManager from "../ConnectionManager";

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        }
    }

    login = () => {
        const {email, password} = this.state;
        let error = "";

        if (!email.trim() && !validateEmail(email.trim())){
            error = "You must enter a valid email";
        }

        if (!password.trim()){
            error = "You must enter a password";
        }

        if (error){
            this.setState({
                error
            });
        } else {
            let connection = new ConnectionManager();
            let data = connection.login(email, password)
            if (data) {
                setTimeout(()=>{
                    this.props.navigate("/movies/")
                }, 500);
            }
        }
    }

    render() {
        return (
            <div>
                <h1 className="text-center">Log In</h1>
                <p>If you don't have an account register. It's Free</p>
                <div>
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
                <button className="btn btn-primary" onClick={this.login}>Login</button>
            </div>
        )
    }
}

export default LoginComponent = withRouter(LoginComponent);