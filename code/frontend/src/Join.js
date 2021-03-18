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
        this.setState({statusMessage: "Loading..."});
        if (this.state.groupID === "") {
            this.setState({statusMessage: "Please enter your Group ID."});
        } else {
            //connect to group
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
                        </header>
                    </div>
                    <div className="status">
                        {this.state.statusMessage}
                    </div>
                </Route>
            </Switch>
        )
    }
}

export default withRouter(Join)