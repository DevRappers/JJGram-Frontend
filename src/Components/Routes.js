import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from '../Routes/Auth';
import Feed from '../Routes/Feed';
import Explore from '../Routes/Explore';
import Profile from '../Routes/Profile';
import Search from '../Routes/Search';

/*
    Switch란 딱 하나의 라우트만 렌더링 해줌
*/
const LoggedInRoutes = () => (
	<Switch>
		<Route exact path="/" component={Feed} />
		<Route path="/explore" component={Explore} />
		<Route path="/search" component={Search} />
		<Route path="/:name" component={Profile} />
		<Redirect from="*" to="/" />
	</Switch>
);

const LoggedOut = () => (
	<Switch>
		<Route exact path="/" component={Auth} />
		<Redirect from="*" to="/" />
	</Switch>
);

const AppRouter = ({ isLoggedIn }) => <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOut />}</Switch>;

AppRouter.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;
