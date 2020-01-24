import React from 'react';
import Signup from './Signup';
import Login from './Login';
import NotFound from './NotFound';
import chat from './chat';

import { Route, Switch } from "react-router-dom";

export default () =>
<Switch>
	<Route exact path ="/" component={Login}/>
	<Route exact path ="/signup" component={Signup}/>
	<Route exact path ="/chat" component={chat}/>
	<Route component={NotFound} />
</Switch>;
