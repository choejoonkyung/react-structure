import React from "react";
import Gnb from "components/Gnb/Gnb";
import { Switch, Route } from "react-router-dom";
import SearchMusic from "pages/SearchMusicPage";
import ErrorPage from "pages/ErrorPage";

function App() {
  return (
    <>
      <Gnb />
      <Switch>
        <Route path="/music/search">
          <SearchMusic />
        </Route>
        <Route path="/error">
          <ErrorPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
