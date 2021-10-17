import React from "react";
import Gnb from "components/Gnb/Gnb";
import { Switch, Route } from "react-router-dom";
import SearchMusic from "pages/SearchMusic";

function App() {
  return (
    <>
      <Gnb />
      <Switch>
        <Route path="/music/search">
          <SearchMusic />
        </Route>
      </Switch>
    </>
  );
}

export default App;
