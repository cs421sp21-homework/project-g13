import React, { Component } from "react";

export default class SetLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      suiteNum: "",
      city: "",
      state: "",
      zipcode: "",
      radius: 5,
    };
  }

  myChangeHandler = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  validInput = () => {
    if (this.state.address === "" || this.state.city === "" ||
        this.state.state === "" || this.state.zipcode === "") {
      this.setState({statusMessage: "Please enter all required fields."});
      return false;
    }
    if (this.state.radius === "") {
      this.setState({statusMessage: "Error: Search radius must be a number."});
      return false;
    }
    if (this.state.radius > 24.85) {
      this.setState({statusMessage: "Error: Maximum search radius is 24.85 miles."});
      return false;
    }
    if (this.state.radius <= 0) {
      this.setState({statusMessage: "Error: Search radius must be greater than 0."});
      return false;
    }
    return true;
  }

  submit = () => {
    this.setState({ statusMessage: "Loading..." });
    if (this.validInput()) {
      var locationString = `${this.state.address} ${this.state.suiteNum} 
      ${this.state.city} ${this.state.state} ${this.state.zipcode}`;
      
      //call the onSubmit function from props
      this.props.onSubmit({location: locationString, radius: this.state.radius});
    }
  };

  render() {
    return (
          <div className="App">
            <header className="App-header">
              <form>
                <h1>Please enter your Location:</h1>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  onChange={this.myChangeHandler}
                />
                <input
                  type="text"
                  name="suiteNum"
                  placeholder="Suite Number (optional)"
                  onChange={this.myChangeHandler}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={this.myChangeHandler}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  onChange={this.myChangeHandler}
                />
                <input
                  type="text"
                  name="zipcode"
                  placeholder="Zip Code"
                  onChange={this.myChangeHandler}
                />
                <br/>
                <h1>Search for restaurants within: </h1>
                <input
                    type="number"
                    name="radius"
                    max={24.85}
                    min={0.5}
                    step={0.5}
                    defaultValue={5}
                    onChange={this.myChangeHandler}
                />
                miles
                <br/>
                <input
                  type="button"
                  value="Submit"
                  onClick={() => {
                    this.submit();
                  }}
                />
                <input 
                  type="button"
                  value="Back"
                  onClick={this.props.onBack}
                />
              </form>
              <div className="status">{this.state.statusMessage}</div>
            </header>
          </div>
    );
  }
}
