import React from "react";
import Gnb from "components/Gnb/Gnb";
import { Switch, Route } from "react-router-dom";
import SearchMusic from "pages/SearchMusicPage";
import ErrorPage from "pages/ErrorPage";
import ApiErrorPage from "pages/ApiErrorPage";
import ErrorHandle from "components/@base/Test/ErrorHandle";

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
        <Route path="/apierror">
          <ApiErrorPage />
        </Route>
        <Route path="/errorhandle">
          <ErrorHandle />
        </Route>
      </Switch>
    </>
  );
}

export default App;
