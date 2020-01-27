import React, { Component, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Routes from './components/routes';
import { withRouter } from 'react-router';
import { Auth } from "aws-amplify";
import Login from './components/Login';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.userHasAuthenticated = this.userHasAuthenticated.bind(this);
    this.state = {
      isAuthenticated: false
    }
  }

  userHasAuthenticated = (value) => {
    this.setState({ isAuthenticated: value });
  }

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push("/");
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
      this.props.history.push("/chat");
    } catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  }

  render() {
    return (
      <Fragment>
        <div className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand" href="#"><h1>Kendra Chat Bot App</h1></Link>
              <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    {this.state.isAuthenticated ? 
                      <Fragment>
                        <li className="nav-item">
                          <NavLink to="/chat" className="nav-link">Chat</NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/" className="nav-link" onClick={this.handleLogout}>Logout</NavLink>
                        </li>
                      </Fragment> : 
                      <Fragment>
                        <li className="nav-item">
                          <NavLink to="/" className="nav-link">Login</NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/Signup" className="nav-link">Signup</NavLink>
                        </li>
                      </Fragment>
                    } 
                  </ul>
              </div>
        </div>
        <Routes userhasauthenticated= { this.userHasAuthenticated } isauthenticated = { this.state.isAuthenticated }/>
      </Fragment>
    );
  }
}

export default withRouter(App);