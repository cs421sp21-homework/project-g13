import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { withRouter } from "react-router-dom";

class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupID: "",
            statusMessage: "",
        };
    }

    join = () => {
        this.setState({statusMessage: "Connecting you to your group..."});
        if (this.state.groupID === "") {
            this.setState({statusMessage: "Please enter your Group ID."});
        } else {
            //connect to group
            sessionStorage.setItem("roomId", this.state.groupID);
            sessionStorage.setItem("isHost", false);
        }
    }

    myChangeHandler = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        return(
            <Switch>
                <Route path="/Join">
                    <div className='App'>
                        <header className='App-header'>
                            <form>
                                <h1>Please enter your Group ID:</h1>
                                <input
                                    type="text"
                                    name="groupID"
                                    placeholder="Group ID"
                                    onChange={this.myChangeHandler}
                                />
                                <br/>
                                <input
                                    type="button"
                                    value="Join"
                                    onClick={() => this.join()}
                                />
                            </form>
                            <div className="status">
                                {this.state.statusMessage}
                            </div>
                        </header>
                    </div>
                </Route>
            </Switch>
        )
    }
}

export default withRouter(Join)