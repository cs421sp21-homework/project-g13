import React from 'react';
import { Switch, Route } from "react-router";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import Login from "./LoginForm";
import UserStore from "../../stores/UserStore";

class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPwd: '',
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

    validatePwd(prop, val) {
        this.setInputValue('confirmPwd', val);
        if(this.state.password !== this.state.confirmPwd) {

        }
    }

    resetForm() {
        this.setState({
            username: '',
            password: '',
            confirmPwd: '',
            buttonDisabled: false
        })
    }

    async doSignup() {
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
            let res = await fetch('/signup', {
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
                //UserStore.isLoggedIn = false; // have not logged in yet, simply created an account
                //UserStore.username = result.username;
            }
            else if(result && result.success === false) {
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
                <Route path="/Signup">
                    <div className="loginSignupForm">
                        Get started with us today!
                        <br/>
                        Create your account by filling out the information below.
                        <br/>
                        Username
                        <InputField type='text'
                                    placeholder='Username'
                                    value={this.state.username ? this.state.username : ''}
                                    onChange={ (val) => this.setInputValue('username', val) }
                        />
                        Password
                        <InputField type='password'
                                    placeholder='Password'
                                    value={this.state.password ? this.state.password : ''}
                                    onChange={ (val) => this.setInputValue('password', val) }
                        />
                        Confirm Password
                        <InputField type='password'
                                    placeholder='Password'
                                    value={this.state.confirmPwd ? this.state.confirmPwd : ''}
                                    onChange={ (val) => this.validatePwd('confirmPwd', val) }
                        />
                        <SubmitButton text='Sign up'
                                    disabled={this.state.buttonDisabled}
                                    onClick={ () => this.doSignup() }
                        />
                        Already have an account? Login <a href={"/Login"}>here</a>
                    </div>
                </Route>
                <Route> <Login/> </Route>
            </Switch>
        );
    }
}

export default SignupForm;