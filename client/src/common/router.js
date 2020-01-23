import { Switch, Route } from "react-router-dom";
import React from "react";

//rotes import
import Login from "./../routes/Login";
import Points from "./../routes/Points";
import Admins from "./../routes/Admins";
import Tasks from "./../routes/Tasks";
import Documentation from "./../routes/Documentation";

//import forms
import FPoint from "./../forms/fPoint";
import FAdmin from "./../forms/fAdmin";
import FTask from "./../forms/fTask";

//import detail views
import DPoint from './../detailed/dpoint';

export default function() {
  return (
    <Switch>
      <Route path="/points">
        <Points />
      </Route>
      <Route path="/admins">
        <Admins />
      </Route>
      <Route path="/documentation">
        <Documentation />
      </Route>
      <Route path="/tasks">
        <Tasks />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/new/point">
        <FPoint {...{ type: 'new' }} />
      </Route>
      <Route path="/new/admin">
        <FAdmin {...{ type: 'new' }} />
      </Route>
      <Route path="/new/task">
        <FTask {...{ type: 'new' }} />
      </Route>
      <Route path="/edit/point/:id">
        <FPoint {...{ type: 'edit' }} />
      </Route>
      <Route path="/edit/admin/:id">
        <FAdmin {...{ type: 'edit' }} />
      </Route>
      <Route path="/edit/task/:id">
        <FTask {...{ type: 'edit' }} />
      </Route>
      <Route path="/details/point/:id">
        <DPoint />
      </Route>
    </Switch>
  );
}
