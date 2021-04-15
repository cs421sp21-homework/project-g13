import React, { Component } from "react";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import 'bootstrap/dist/css/bootstrap.css';

class Join extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = props.onSubmit;
    this.state = {
      groupID: "",
    };
  }

  join = () => {
    this.onSubmit(this.state.groupID);
  };

  myChangeHandler = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
        <div className="App">
        <header className="App-header">
            <form>
            <h1 style={{fontWeight: "bold"}}>Please enter your Group ID</h1>
                <TextField
                    required
                    id="address"
                    label="Group ID"
                    variant="outlined"
                    helperText="* are required fields"
                    name="groupID"
                    style={{width:256}}
                    onChange={this.myChangeHandler}
                />
                <br/>
                <button type="button" className="btn btn-primary join-button orange-button"
                    onClick={() => this.join()}>Join</button>
            </form>
            <div className="join-status">{this.props.statusMessage}</div>
        </header>
        </div>
    );
  }
}

export default Join;
