import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch, useRouteMatch} from "react-router-dom";
import AddCircuit from './md-circuits/AddCircuit';

const AppRouter = () : any => {
    return (
      <Switch>
        <Route exact path="/circuits">
          <AddCircuit />
        </Route>
      </Switch>
    )
}

export default AppRouter;