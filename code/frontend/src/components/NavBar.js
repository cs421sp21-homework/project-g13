import { Component } from "react";
import { withRouter } from "react-router-dom";
import { Navbar, Nav, Dropdown, DropdownButton } from "react-bootstrap"; 
import 'bootstrap/dist/css/bootstrap.css';
import UserStore from "../stores/UserStore";
import * as api from "../api/Api.js";


class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavCollapsed: true,
        }
    }

    getActivePage() {
        return this.props.location.pathname;
    }

    onClickAccount() {

    }

    onClickJoin() {
        //if (this.getActivePage() === "/Host") sessionStorage.clear();
        this.props.history.push("/Join");
    }

    login() {
        return(
            <div className="navbar-nav ml-auto">
            <button type="button" className="btn btn-outline-primary app-nav-button app-nav-login" onClick={() => this.props.history.push("/Login")}>Log in</button>
            <button type="button" className="btn btn-outline-secondary app-nav-button app-nav-signup" onClick={() => this.props.history.push("/Signup")}>Sign up</button>
            </div>
        );
    }

    account() {
        const buttonType = '<button type="button" className="btn btn-outline-primary app-nav-button app-nav-login">';
        return(
            <div className="navbar-nav ml-auto">
                <button type="button" className="btn btn-outline-primary app-nav-button app-nav-login" onClick={() => this.props.history.push("/Account")}>Account</button>
                <Dropdown>
                    <Dropdown.Toggle id="dropdown" as={buttonType}>
                        Account
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <DropdownButton id="account" title="Account">
                    <Dropdown.Item as="button" onClick={() => this.props.history.push("/Account")}>My Preferences</Dropdown.Item>
                    <Dropdown.Item as="button">My Address</Dropdown.Item>
                </DropdownButton>
                <button type="button" className="btn btn-outline-primary app-nav-button app-nav-login" onClick={() => this.logout()}>Logout</button>
            </div>
        )
    };

    async logout() {
      
        try{
            let currUser = localStorage.getItem("username");
            let result = await api.logout(currUser);
            //if((result.userName).valueOf() === (this.state.username).valueOf()) {
                //const logoutSuccess = new String((JSON.parse(result))["message"]); // getting the return string from Java routing method
                const success = new String("success");
                //const fail = new String("fail");
                //if (message.valueOf() === )
                if ((result.message).valueOf() === success.valueOf()) {
                    localStorage.removeItem("username");
                    alert("Logout succesful");
                    this.props.history.push("/"); // going back to Home page
                } else {
                    // do something about wrong passwords
                    this.props.history.push("/"); // just trying to refresh page
                    alert("Unable to logout");
                }
            /*} else {
                this.resetForm();
                alert(result.msg);
            }*/
        }
        catch (e) {
            console.log(e);
            alert("Backend server down: Unable to process logout request");
            //this.props.history.push("/"); // just trying to refresh page
        }

      }

    render() {
        const isNavCollapsed = this.state.isNavCollapsed;
        const activePage = this.getActivePage();
        let isLoggedIn = true;

        if (localStorage.getItem("username") === null) {
            isLoggedIn = false;
        }

        return (
            <div style={{width: "95%", margin: "0 auto 0 auto", paddingTop: "2vh"}} className="app-background-color">
                <nav class="navbar navbar-expand-md navbar-light bg-white">
                <div class="container-fluid navbar-container-md">
                    <a class="navbar-brand appnav-brand" href="/">Chicken Tinder</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" 
                    data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" 
                    aria-expanded="false" aria-label="Toggle navigation" onClick={() => this.setState({isNavCollapsed: !this.state.isNavCollapsed})}>
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className={(isNavCollapsed) ? "collapse navbar-collapse w-100" : "navbar-collapse"} id="navbarNavAltMarkup">
                        <div class="navbar-nav w-100 justify-content-center">
                            <a className={`nav-link app-nav-link ${(activePage === "/") ? "app-nav-active" : ""}`} href="/">Home</a>
                            <a className={`nav-link app-nav-link ${(activePage === "/Host") ? "app-nav-active" : ""}`} href="/Host">Host</a>
                            <a className={`nav-link app-nav-link ${(activePage === "/Join") ? "app-nav-active" : ""}`} onClick={() => this.onClickJoin()}>Join</a>
                        </div>
                    </div>
                    <div className={(isNavCollapsed) ? "collapse navbar-collapse" : "navbar-collapse"} id="navbarNavAltMarkup">
                        <div class="navbar-nav ml-auto">
                            {isLoggedIn ? this.account() : this.login()}
                        </div>
                    </div>
                    </div>
                </nav>
          </div>
        );
    }
}

export default withRouter(AppNavbar);