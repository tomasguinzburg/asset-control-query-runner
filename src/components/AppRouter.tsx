import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddCircuit from './md-circuits/AddCircuit';
import EditCircuit from './md-circuits/EditCircuit';
import AddJob from './md-jobs/AddJob';
import EditJob from './md-jobs/EditJob';
import AddCircuitJob from './last-order/md-circuits-jobs/AddCircuitJob'

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
        <Route path="/last-order/circuits-jobs/:circuitJobID" component={EditJob}></Route> {/*todo*/}
      </Switch>
    )
}

export default AppRouter