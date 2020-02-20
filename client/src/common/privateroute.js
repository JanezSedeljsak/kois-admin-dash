import { Route, Redirect } from "react-router-dom";
import React from "react";

const KoisRoute = ({ component: Component, publicRoute, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("_kToken") || publicRoute ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default KoisRoute;
