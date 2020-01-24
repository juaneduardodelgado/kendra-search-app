import React, { Component, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Routes from './components/routes';
import { withRouter } from 'react-router';

import awsconfig from './aws-exports';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
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
                          <NavLink onClick={this.handleLogout}>Logout</NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/chat" className="nav-link">Chat</NavLink>
                        </li>
                      </Fragment> :
                      <Fragment>
                        <li className="nav-item">
                          <NavLink to="/" className="nav-link">Login</NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/signup" className="nav-link">Signup</NavLink>
                        </li>
                      </Fragment>
                    }
                  </ul>
              </div>
        </div>
        <Routes/>
      </Fragment>
    );
  }
}

export default withRouter(App);