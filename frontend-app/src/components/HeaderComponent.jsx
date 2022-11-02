import React from "react";
import {withRouter} from "../utils";

class HeaderComponent extends React.Component {

    logout = () => {
        localStorage.clear();
        this.props.navigate("/");
    }

    render() {
        return (
            <div className="row justify-content-between mb-5" style={{marginTop: "30px", borderStyle: "dashed"}}>
                <div className="col col-4" style={{marginLeft: "20px"}}>
                    <h1>Rotten Potatoes</h1>
                </div>
                <div className="col col-1">
                    <button className="btn btn-danger mt-2" onClick={this.logout}>Log Out</button>
                </div>
            </div>
        )
    }
}

export default HeaderComponent = withRouter(HeaderComponent);