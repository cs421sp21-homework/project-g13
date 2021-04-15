import { Component } from "react";
import { withRouter } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap"; 
import 'bootstrap/dist/css/bootstrap.css';

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

    onClickJoin() {
        if (this.getActivePage() === "/Host") sessionStorage.clear();
        this.props.history.push("/Join");
    }


    render() {
        const isNavCollapsed = this.state.isNavCollapsed;
        const activePage = this.getActivePage();
        const isLoggedIn = false;

        return (
            <div style={{width: "95%", margin: "0 auto 0 auto", paddingTop: "2vh"}} className="app-background-color">
                <nav class="navbar navbar-expand-md navbar-light bg-white">
                <div class="container-fluid navbar-container-md">
                    <a class="navbar-brand appnav-brand" href="#">Chicken Tinder</a>
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
                            <button type="button" class="btn btn-outline-primary app-nav-button app-nav-login">Log in</button>
                            <button type="button" class="btn btn-outline-secondary app-nav-button app-nav-signup">Sign up</button>
                        </div>
                    </div>
                    </div>
                </nav>
          </div>
        );
    }
}

export default withRouter(AppNavbar);