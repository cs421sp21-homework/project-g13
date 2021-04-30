import React, { Component } from "react";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {FormControl, InputGroup, Modal, Button} from "react-bootstrap";
import RequestNickname from "./RequestNickname.js"
import 'bootstrap/dist/css/bootstrap.css';
import { FlashOnTwoTone } from "@material-ui/icons";

const styles = theme => ({
    input: {
        height: 50,
        fontSize: 24,
    }
});

class Join extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = props.onSubmit;
    this.state = {
      groupID: "",
      showJoinModal: false,
    };
  }

  askForNickname() {
    this.setState({showJoinModal: true});
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

  setNickname(nickname) {
      this.props.setNickname(nickname.trim(), this.state.groupID);
      this.setState({showJoinModal: false})
  }

  render() {
    return (
        <div className="App">
            <form>
            <h1 style={{fontWeight: "bold"}}>Please enter your Group ID</h1>
                <TextField
                    required
                    label="Group ID"
                    variant="outlined"
                    helperText="* are required fields"
                    name="groupID"
                    style={{width: 256}}
                    InputProps={{className: this.props.classes.input}}
                    onChange={this.myChangeHandler}
                />
                <br/>
                <button type="button" className="btn btn-primary join-button"
                    onClick={() => this.join()}>Join</button>
            </form>
            <div className="join-status">{this.props.statusMessage}</div>
           <RequestNickname show={this.state.showJoinModal} setNickname={(nickname) => this.setNickname(nickname)} />
        </div>
    );
  }
}

export default withStyles(styles)(Join);
