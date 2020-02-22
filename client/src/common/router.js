import { Router, Switch } from "react-router-dom";
import React from "react";
import Route from './routewrapper';

//rotes import
import Home from "./../containers/Home";
import Login from "./../containers/Login";
import Points from "./../containers/Points";
import Admins from "./../containers/Admins";

//import forms
import FPoint from "./../forms/fPoint";
import FAdmin from "./../forms/fAdmin";

//import detail views
import DPoint from "./../detailed/dpoint";

export default function () {
    const _R = [
        // auth route
        { path: "/login", component: <Login />, authRequired: false },

        // common routes
        { path: "/points", component: <Points />, authRequired: true },
        { path: "/admins", component: <Admins />, authRequired: true },

        // form routes
        { path: "/new/point", component: <FPoint {...{ type: "new" }} />, authRequired: true },
        { path: "/new/admin", component: <FAdmin {...{ type: "new" }} />, authRequired: true },
        { path: "/edit/point/:id", component: <FPoint {...{ type: "edit" }} />, authRequired: true },
        { path: "/edit/admin/:id", component: <FAdmin {...{ type: "edit" }} />, authRequired: true },

        // detailed view routes
        { path: "/details/point/:id", component: <DPoint />, authRequired: true },

        // home route
        { path: '', component: <Home />, authRequired: false },
    ];

    return (
        <Switch>
            {_R.map(({ path, component, authRequired }, index) => (
                <Route key={index} path={path} isPrivate={authRequired || false} >{component}</Route>
            ))}
        </Switch>
    );
}
