import React from 'react';
import Signup from './Signup';
import Login from './Login';
import NotFound from './NotFound';
import Chat from './chat';
import Search from './Search';

import { Route, Switch } from "react-router-dom";

export default parentProps =>
<Switch>
    <Route exact path ="/" render={props => <Login {...props} {...parentProps} />} />
    <Route exact path ="/Signup" render={props => <Signup {...props} {...parentProps} />} />
    <Route exact path ="/Chat" render={props => <Chat {...props} {...parentProps} />} />
	<Route exact path ="/Search" render={props => <Search {...props} {...parentProps} />} />
    <Route component={NotFound} />
</Switch>;