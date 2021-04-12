import React from 'react';
import { Switch, Route } from "react-router";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import UserStore from "../../stores/UserStore";
import Home from "../../pages/Home";


class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false
        }
    }

    setInputValue(prop, val) {
        val = val.trim();
        if(val.length > 12) {
            return;
        }
        this.setState({
            [prop]: val
        })
    }

    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }

    async doLogin() {
        if(!this.state.username) {
            return;
        }
        if(!this.state.password) {
            return;
        }
        this.setState({
            buttonDisabled: true
        })

        try{
            let res = await fetch('/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            });

            let result = await res.json();
            if(result && result.success) {
                const loginSuccess = new String((JSON.parse(result))["toString"]); // getting the return string from Java routing method
                const pass = new String("pass");
                //const fail = new String("fail");
                if (loginSuccess.valueOf() === pass.valueOf()) {
                    UserStore.isLoggedIn = true;
                    UserStore.username = result.username;
                    this.props.history.push("/"); // going back to Home page
                } 
            } else if(result && result.success === false) {
                this.resetForm();
                alert(result.msg);
            }
        }
        catch (e) {
            console.log(e);
            this.resetForm();
        }
    }

    render() {
        return (
            <Switch>
                <Route path="/Login">
                    <div className="loginSignupForm">
                        Log in
                        <InputField type='text'
                                    placeholder='Username'
                                    value={this.state.username ? this.state.username : ''}
                                    onChange={ (val) => this.setInputValue('username', val) }
                        />
                        <InputField type='password'
                                    placeholder='Password'
                                    value={this.state.password ? this.state.password : ''}
                                    onChange={ (val) => this.setInputValue('password', val) }
                        />
                        <SubmitButton text='Login'
                                    disabled={this.state.buttonDisabled}
                                    onClick={ () => this.doLogin() }
                        />
                    </div>
                </Route>
                <Route path="/"><Home/></Route>
            </Switch>
        );
    }
}

export default LoginForm;