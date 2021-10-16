import React from "react";
import Gnb from "components/Gnb/Gnb";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Gnb />
      <Switch>
        <Route path="/test"></Route>
      </Switch>
    </>
  );
}

export default App;
