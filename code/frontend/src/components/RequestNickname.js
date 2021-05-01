import React, { Component } from "react";
import {FormControl, InputGroup, Modal, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';

export default class RequestNickname extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showJoinModal: false,
            nickname: "",
            errorMessage: "",
            isInvalid: false,
        }
    }

    onNicknameChanged = (event) => {
        this.checkNicknameValidity(event.target.value);
    };
    
    checkNicknameValidity(nickname) {
        if (this.isStringValid(nickname)) {
            this.setState({isInvalid: false, nickname: nickname.trim()})
            return true;
        } else {
            this.setState({isInvalid: true, errorMessage: "The nickname cannot be empty.", nickname: nickname.trim()})
            return false;
        }
    }
    
    isStringValid(string) {
        if (string === "" || string === null || string === undefined || string.trim() === "") {
            return false;
        }
        return true;
    }

    setNickname() {
        if (this.checkNicknameValidity(this.state.nickname)) {
          //console.log("group id" + this.state.groupID);
          this.props.setNickname(this.state.nickname.trim());
          this.setState({showJoinModal: false})
        }
    }

    render() {
        return (
            <Modal
              show={this.props.show}
              //onHide={() => this.setState({showModal: false})}
              backdrop="static"
              keyboard={false}>
              <Modal.Header>
                <Modal.Title>Enter your nickname</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <label htmlFor="nickname">Please enter your nickname</label>
                <InputGroup className="mb-3">
                  <FormControl type="text" id="nickname" onChange={this.onNicknameChanged} isInvalid={this.state.isInvalid}/>
                  <FormControl.Feedback type="invalid">{this.state.errorMessage}</FormControl.Feedback>
                </InputGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={() => this.setNickname()}>Submit</Button>
              </Modal.Footer>
            </Modal>
        );
    }
}