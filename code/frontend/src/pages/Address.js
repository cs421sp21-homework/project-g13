import { values } from "mobx";
import React, { Component } from "react";
import {Form, Col, Row, Button, FormControl, Spinner, Modal} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {getLocation, setLocation} from "../api/Api.js";

class Address extends Component {
    constructor(props) {
        super(props);

        //check if someone is logged in, if not redirect to home page
        if (localStorage.getItem("username") === null) {
            this.props.history.push("/");
        }

        const isInvalid = new Map();
        this.setDefaultValues(isInvalid, false);
        const values = new Map();
        this.setDefaultValues(values, "");
        this.state = {
            canNotEdit: true,
            errorMessage: "Please make sure the information entered is not blank",
            isInvalid: isInvalid,
            values: values,
            hasAddress: false,
            showLoadingModal: true,
            showErrorModal: false,
            showSuccessModal: false,

        }
        this.realValues = new Map();
        this.setDefaultValues(this.realValues, "");

        this.renders = 0;

        //retrieve user location data
        this.retrieveUserLocation();
    }

    async retrieveUserLocation() {
        console.log("start retrieve");
        let showError = false;
        let hasAddress = false;
        try {
            let location = await getLocation(localStorage.getItem("username")).trim();
            console.log("location: " + location);
            if (location !== "") {
                let splitLocation = location.split("%", 5);
                let fields = ["address1", "address2", "city", "state", "zip"];
                for (let i=0; i<splitLocation.length; i++) {
                    this.state.values.set(fields[i], splitLocation[i]);
                    this.realValues.set(fields[i], splitLocation[i]);
                }
                //this.setState({showLoadingModal: false, hasAddress: true});
                hasAddress = true;
                console.log("loc");
            } else {
                //this.setState({showLoadingModal: false});
                console.log("no loc");
            }
        } catch (err) {
            //this.setState({showErrorModal: true, showLoadingModal: false});
            showError = true;
            console.log("err");
            console.log("loading modal: " + this.state.showLoadingModal);
        }
        if (this.renders > 0) {
            this.setState({showErrorModal: showError, showLoadingModal: false, hasAddress: hasAddress});
        } else {
            this.state.hasAddress = hasAddress;
            this.state.showErrorModal = showError;
            this.state.showLoadingModal = false;
        }
        console.log("end retrieve");
    }

    setDefaultValues(map, defaultValue) {
        let fields = ["address1", "address2", "city", "state", "zip"];
        fields.forEach((field) => {
            map.set(field, defaultValue);
        });
    }

    myChangeHandler = (event) => {
        event.preventDefault();
        this.state.values.set(event.target.name, event.target.value);
        this.setState({
          values: this.state.values,
        });
        console.log(event.target.value);
    };

    onCancel() {
        let fields = ["address1", "address2", "city", "state", "zip"];
        let notShowAddress = false;
        fields.forEach((field) => {
            const realvalue = this.realValues.get(field);
            this.state.values.set(field, realvalue);
            notShowAddress = realvalue === "" && notShowAddress === false;
        });
        this.setState({canNotEdit: true, hasAddress: !notShowAddress});
    }

    onClickSave() {
        if (this.validateAddress()) {
            //add a popup that says address saved
            this.setState({showLoadingModal: true});
            this.saveAddress();
        }
    }

    async saveAddress() {
        let location = `${this.state.values.get("address1")}%${this.state.values.get("address2")}
            %${this.state.values.get("city")}%${this.state.values.get("state")}%${this.state.values.get("zip")}`;
            try {
                await setLocation(localStorage.getItem("username"), location);
                //updated real values
                let fields = ["address1", "address2", "city", "state", "zip"];
                fields.forEach((field) => {
                    this.realValues.set(field, this.state.values.get(field));
                });
                this.setState({showLoadingModal: false, showSuccessModal: true})
            } catch (err) {
                //console.log("unable to save");
                this.setState({showErrorModal: true, showLoadingModal: false});
            }
    }

    validateAddress() {
        let fields = ["address1", "address2", "city", "state", "zip"];
        let redraw = false;
        fields.forEach((field) => {
            const value = this.state.values.get(field);
            if (value === undefined || value === null || value === "" || value.trim() === "") {
                redraw = true;
                this.state.isInvalid.set(field, true);
            }
        });
        if (redraw === true) {
            this.setState({canNotEdit: this.state.canNotEdit});
        }
        return !redraw;
    }

    render() {
        const hasAddress = this.state.hasAddress;
        const canNotEdit = this.state.canNotEdit;

        this.renders += 1;
        console.log("render: " + this.renders);

        console.log("loading modal: " + this.state.showLoadingModal);
        return (
            <div className="address-content">
                <span style={{display: "block"}}>My Address</span>

                {hasAddress === true &&
                <div className="address-container">
                    <Form>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label className="float-left">Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" name="address1" readOnly={this.state.canNotEdit}
                         isInvalid={this.state.isInvalid.get("address1")} value={this.state.values.get("address1")} onChange={this.myChangeHandler}/>
                        <FormControl.Feedback className="float-left" type="invalid">{this.state.errorMessage}</FormControl.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label className="float-left">Address 2</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor" name="address2" readOnly={this.state.canNotEdit}
                         isInvalid={this.state.isInvalid.get("address2")} value={this.state.values.get("address2")} onChange={this.myChangeHandler}/>
                        <FormControl.Feedback className="float-left" type="invalid">{this.state.errorMessage}</FormControl.Feedback>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label className="float-left">City</Form.Label>
                        <Form.Control placeholder="City" name="city" readOnly={this.state.canNotEdit}
                         isInvalid={this.state.isInvalid.get("city")} value={this.state.values.get("city")} onChange={this.myChangeHandler}/>
                        <FormControl.Feedback className="float-left" type="invalid">{this.state.errorMessage}</FormControl.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label className="float-left">State</Form.Label>
                            <Form.Control placeholder="State" name="state" readOnly={this.state.canNotEdit}
                             isInvalid={this.state.isInvalid.get("state")} value={this.state.values.get("state")} onChange={this.myChangeHandler}/>
                            <FormControl.Feedback className="float-left" type="invalid">{this.state.errorMessage}</FormControl.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label className="float-left">Zip</Form.Label>
                        <Form.Control placeholder="Zip" name="zip" readOnly={this.state.canNotEdit}
                         isInvalid={this.state.isInvalid.get("zip")} value={this.state.values.get("zip")} onChange={this.myChangeHandler}/>
                        <FormControl.Feedback className="float-left" type="invalid">{this.state.errorMessage}</FormControl.Feedback>
                        </Form.Group>
                    </Form.Row>

                    
                    </Form>
                </div>
                }
                
                {hasAddress === false &&
                    <button className="btn btn-primary address-button" style={{width: "20vmin"}}
                    onClick={() => this.setState({hasAddress: true, canNotEdit: false})}>+ Add Address</button>
                }

                {canNotEdit === true && hasAddress === true &&
                    <button className="btn btn-primary address-button" onClick={() => this.setState({canNotEdit: false})}>Edit</button>
                }

                {canNotEdit === false && hasAddress === true &&
                    <div>
                        <button className="btn btn-secondary address-button" onClick={() => this.onCancel()}>Cancel</button>
                        <button className="btn btn-primary address-button" onClick={() => this.onClickSave()}>Save</button>
                    </div>
                }

                <Modal
                    show={this.state.showLoadingModal || this.state.showErrorModal || this.state.showSuccessModal}
                    //onHide={() => this.setState({showModal: false})}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header>
                        {this.state.showLoadingModal === true &&
                            <Modal.Title>Loading...</Modal.Title>
                        }   
                        {this.state.showErrorModal === true &&
                            <Modal.Title>Error</Modal.Title>
                        }   

                        {this.state.showSuccessModal === true &&
                            <Modal.Title>Success</Modal.Title>
                        }
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.showLoadingModal === true &&
                                <div>
                                    <span>Please wait while we retrieve data from the server</span>
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                 </div>
                        }   
                        {this.state.showErrorModal === true &&
                            <span>An error was encountered while retrieving or saving your address.</span>
                        }   

                        {this.state.showSuccessModal == true &&
                            <span>Your location was successfully saved!</span>
                        }

                    </Modal.Body>
                    <Modal.Footer>
                        {this.state.showErrorModal === true &&
                                <Button variant="primary" onClick={() => this.setState({showErrorModal: false})}>Done</Button>
                        }   
                        {this.state.showSuccessModal == true &&
                            <Button variant="primary" onClick={() => this.setState({showSuccessModal: false})}>Done</Button>
                        }
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default withRouter(Address);