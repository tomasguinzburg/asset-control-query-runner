import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddCircuit from './md-circuits/AddCircuit';
import EditCircuit from './md-circuits/EditCircuit';
import AddJob from './md-jobs/AddJob';
import EditJob from './md-jobs/EditJob';

const AppRouter = () : any => {
    return (
      <Switch>
        <Route exact path="/circuits">
          <AddCircuit />
        </Route>
          <Route path="/circuits/:circuitID" component={EditCircuit}></Route>
        <Route exact path="/jobs">
          <AddJob />
        </Route>
        <Route path="jobs/:jobID" component={EditJob}></Route>
      </Switch>
    )
}

export default AppRouter