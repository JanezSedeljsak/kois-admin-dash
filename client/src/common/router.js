import { Switch, Route } from "react-router-dom";
import React from "react";
import PrivateRoute from './../common/privateroute';

//rotes import
import Login from "./../containers/Login";
import Points from "./../containers/Points";
import Admins from "./../containers/Admins";
import Tasks from "./../containers/Tasks";
import Documentation from "./../containers/Documentation";

//import forms
import FPoint from "./../forms/fPoint";
import FAdmin from "./../forms/fAdmin";
import FTask from "./../forms/fTask";

//import detail views
import DPoint from "./../detailed/dpoint";

export default function() {
  const _R = [
    // auth route
    { path: "/login", component: <Login />, authRequired: false },

    // common routes
    { path: "/points", component: <Points />, authRequired: true },
    { path: "/admins", component: <Admins />, authRequired: true },
    { path: "/documentation", component: <Documentation />, authRequired: false },
    { path: "/tasks", component: <Tasks />, authRequired: true },

    // form routes
    { path: "/new/point", component: <FPoint {...{ type: "new" }} />, authRequired: true },
    { path: "/new/admin", component: <FAdmin {...{ type: "new" }} />, authRequired: true },
    { path: "/new/task", component: <FTask {...{ type: "new" }} />, authRequired: true },
    { path: "/edit/point/:id", component: <FPoint {...{ type: "edit" }} />, authRequired: true },
    { path: "/edit/admin/:id", component: <FAdmin {...{ type: "edit" }} />, authRequired: true },
    { path: "/edit/task/:id", component: <FTask {...{ type: "edit" }} />, authRequired: true },

    // detailed view routes
    { path: "/details/point/:id", component: <DPoint />, authRequired: true }
  ];

  return (
    <Switch>
      {_R.map(({ path, component, authRequired }) => (
        authRequired ? 
            <PrivateRoute key={path} path={path} component={component} />
            : <Route key={path} path={path}>{component}</Route>
      ))}
    </Switch>
  );
}
