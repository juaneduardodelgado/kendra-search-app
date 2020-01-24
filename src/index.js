import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import config from './aws-exports'
import Amplify, { Auth } from 'aws-amplify';
Amplify.configure(config);

const routing = (
		<Router>
			<Switch>
				<Route exact path ="/" component={Login}/>
				<Route exact path ="/signup" component={Signup}/>
				<Route exact path ="/chat" component={Chat}/>
				<Route component={NotFound} />
			</Switch>
		</Router>
	)
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();