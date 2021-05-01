import React, { Component } from "react";
import {Form, Col, Row, Button, FormControl} from "react-bootstrap";
import { withRouter } from "react-router-dom";

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

        }
        this.realValues = new Map();
        this.setDefaultValues(this.realValues, "");
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

    onSaveAddress() {
        if (this.validateAddress()) {

            //add a popup that says address saved
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
                        <button className="btn btn-primary address-button" onClick={() => this.onSaveAddress()}>Save</button>
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(Address);