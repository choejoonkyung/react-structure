import { Link, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/test">Test</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/test"></Route>
      </Switch>
    </div>
  );
}

export default App;
