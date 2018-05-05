import { Meteor } from "meteor/meteor";
import React from "react";
import { Router, Switch, Route, withRouter } from "react-router-dom";
import history from "../history";
import Signup from "../ui/Signup";
import Link from "../ui/Link";
import NotFound from "../ui/NotFound";
import Login from "../ui/Login";

const unauthenticatedPages = ["/", "/signup"];
const authenticatedPages = ["/links"];

const onEnterPublicPage = () => {
  if (Meteor.userId()) history.replace("/links");
};

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) history.replace("/");
};

export const onAuthChange = isAuthenticated => {
  const pathname = history.location.pathname;
  const isUnAuthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  if (isUnAuthenticatedPage && isAuthenticated) {
    history.replace("/links");
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace("/");
  }
};

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login} onEnter={onEnterPublicPage} />
      <Route exact path="/signup" component={Signup} onEnter={onEnterPublicPage} />
      <Route exact path="/links" component={Link} onEnter={onEnterPrivatePage} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
