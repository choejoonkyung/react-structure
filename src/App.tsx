import { Link, Switch, Route } from "react-router-dom";
import { css } from "@emotion/react";

function App() {
  return (
    <div>
      <nav>
        <ul css={gnbStyle}>
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

const gnbStyle = css`
  display: flex;
`;

export default App;
