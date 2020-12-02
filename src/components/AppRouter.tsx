import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddCircuit from './md-circuits/AddCircuit';
import EditCircuit from './md-circuits/EditCircuit';
import AddJob from './md-jobs/AddJob';
import EditJob from './md-jobs/EditJob';
import AddCircuitJob from './last-order/md-circuits-jobs/AddCircuitJob'
import EditCircuitJob from './last-order/md-circuits-jobs/EditCircuitJob';
import AddCircuitAttribute from './last-order/md_circuits_attributes/AddCircuitAttribute';

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
        <Route path="/jobs/:jobID" component={EditJob}></Route>
        <Route exact path="/last-order/circuits-jobs">
          <AddCircuitJob />
        </Route>
        <Route path="/last-order/circuits-jobs/:circuitJobID" component={EditCircuitJob}></Route>
        <Route exact path="/last-order/circuits-attributes">
          <AddCircuitAttribute />
        </Route>
      </Switch>
    )
}

export default AppRouter