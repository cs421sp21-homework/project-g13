import React, { Component } from "react";
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  textField: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  submit: {
    color: '#522402',
    backgroundColor: '#eca237',
    boxShadow: 'none',
    margin: theme.spacing(2),
    width: 128,
    height:48,
    fontSize: 20,
    '&:hover': {
      backgroundColor: '#f9b042',
      borderColor: '#f9b042',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#f9b042',
      borderColor: '#f9b042',
    },
  },
  back: {
    color: '#522402',
    backgroundColor: '#f1d043',
    boxShadow: 'none',
    margin: theme.spacing(2),
    width: 128,
    height:48,
    fontSize: 20,
    '&:hover': {
      backgroundColor: '#ffe03b',
      borderColor: '#ffe03b',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#ffe03b',
      borderColor: '#ffe03b',
    },
  },
});

class SetLocation extends Component {
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

  setStatusMessage(message) {
    if (message != null) {
      this.setState({statusMessage: message});
    }
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
    this.setState({ statusMessage: "Fetching restaurants..."});
    this.statusMessageChanged = true;
    if (this.validInput()) {
      var locationString = `${this.state.address} ${this.state.suiteNum} 
      ${this.state.city} ${this.state.state} ${this.state.zipcode}`;
      
      //call the onSubmit function from props
      this.props.onSubmit({location: locationString, radius: this.state.radius});
    }
  };

  sliderChange = (event, newValue) => {
    this.state.radius = newValue;
  };

  sliderBlur = (value) => {
    if (value < 0) {
      this.state.radius = 0;
    } else if (value > 24.85) {
      this.state.radius = 24.85;
    }
  };

  render() {
    return (
          <div className="App">
            <header className="App-header">
              <form className={this.props.classes.textField}>
                <h1>Please enter your Location:</h1>
                <TextField
                    required
                    id="address"
                    label="Address"
                    variant="outlined"
                    fullWidth
                    name="address"
                    onChange={this.myChangeHandler}
                />
                <TextField
                    id="suiteNum"
                    label="Suite Number"
                    variant="outlined"
                    fullWidth
                    name="address"
                    onChange={this.myChangeHandler}
                />
                <TextField
                    required
                    id="city"
                    label="City"
                    variant="outlined"
                    fullWidth
                    name="city"
                    onChange={this.myChangeHandler}
                />
                <TextField
                    required
                    id="state"
                    label="State"
                    variant="outlined"
                    fullWidth
                    name="state"
                    onChange={this.myChangeHandler}
                />
                <TextField
                    required
                    id="zip"
                    label="Zip Code"
                    variant="outlined"
                    helperText="* are required fields"
                    fullWidth
                    name="zipcode"
                    onChange={this.myChangeHandler}
                />
                <br/>
                <h2>Search for restaurants within: </h2>
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
                <Button
                    className={this.props.classes.submit}
                    onClick={() => {
                      this.submit();
                    }}
                    variant="contained"
                    size='large'
                >
                  Submit
                </Button>
                <Button
                    className={this.props.classes.back}
                    onClick={this.props.onBack}
                    variant="contained"
                    size='large'
                >
                  Back
                </Button>
              </form>
              <div className="status">{this.state.statusMessage}</div>
            </header>
          </div>
    );
  }
}

export default withStyles(styles)(SetLocation);