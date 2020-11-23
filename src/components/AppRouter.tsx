import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, useRouteMatch } from "react-router-dom";
import AddCircuit from './md-circuits/AddCircuit';
import EditCircuit from './md-circuits/EditCircuit';

const AppRouter = () : any => {
    return (
      <Switch>
        <Route exact path="/circuits">
          <AddCircuit />
        </Route>
        <Route path="/circuits/:circuitID">
          <EditCircuit />
        </Route>
      </Switch>
    )
}

export default AppRouter