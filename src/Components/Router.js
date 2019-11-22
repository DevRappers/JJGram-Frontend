import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";

const LoggedInRoutes = () => <><Route exact path="/" component={Feed}/></>

const LoggedOut = () => <><Route exact path="/" component={Auth} /></>

const AppRouter = ({ isLoggedIn }) => <Switch>{isLoggedIn ? <LoggedInRoutes/> : <LoggedOut/>}</Switch>

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default AppRouter;