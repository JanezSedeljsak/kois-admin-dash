import { Switch, Route } from "react-router-dom";
import React from "react";

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
    { path: "/login", component: <Login /> },

    // common routes
    { path: "/points", component: <Points /> },
    { path: "/admins", component: <Admins /> },
    { path: "/documentation", component: <Documentation /> },
    { path: "/tasks", component: <Tasks /> },

    // form routes
    { path: "/new/point", component: <FPoint {...{ type: "new" }} /> },
    { path: "/new/admin", component: <FAdmin {...{ type: "new" }} /> },
    { path: "/new/task", component: <FTask {...{ type: "new" }} /> },
    { path: "/edit/point/:id", component: <FPoint {...{ type: "edit" }} /> },
    { path: "/edit/admin/:id", component: <FAdmin {...{ type: "edit" }} /> },
    { path: "/edit/task/:id", component: <FTask {...{ type: "edit" }} /> },

    // detailed view routes
    { path: "/details/point/:id", component: <DPoint /> }
  ];

  return (
    <Switch>
        {_R.map(({ path, component }) => <Route key={path} path={path}>{component}</Route>)}
    </Switch>
  );
}
