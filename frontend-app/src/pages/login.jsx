import React from "react";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";

export default class LoginPage extends React.Component {

    constructor() {
        super();
    }

    login = () => {

    }

    render() {
        return (
            <div className="row align-items-center justify-content-md-center" style={{minWidth: "100wh", minHeight: "100vh"}}>

                <div className="col col-md-6">
                    <h1 className="text-center">Rotten Potatoes</h1>
                    <span className="d-flex justify-content-center">
                        <img src="https://i1.sndcdn.com/avatars-000599599758-5qrdpx-t500x500.jpg" alt="rotten potatoes logo" width="200px"/>
                    </span>
                    <div className="row">
                        <div className="col col-md-6">
                            <LoginComponent />
                        </div>
                        <div className="col col-md-6">
                            <RegisterComponent />
                        </div>
                    </div>

                </div>


            </div>
        )

    }
}