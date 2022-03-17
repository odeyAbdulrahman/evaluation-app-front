import "./App.css";
import React from "react";
import { HashRouter as Router,Switch, Route } from "react-router-dom";
import Evaluation from "./component/Evaluation/Evaluation";
import NotFound from "./component/NotFound/NotFound";

function App() {
  return (
    <Router>
      <div className="container d-flex justify-content-center">
        <Switch>
          <Route exact path="/">
            <Evaluation />
          </Route>
          <Route path="/:departmentId">
            <Evaluation />
          </Route>
          <Route exact path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
