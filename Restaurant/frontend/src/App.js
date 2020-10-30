
import React from "react";
// import "./styles.css";
// import Header from "./Components/Header";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from './Home';

export default function App(props) {
  // const userSignIn = useSelector(state => state.userSignIn);
  // const userInfo = userSignIn;

  // const classes = useStyles();
  return (
    <BrowserRouter>

      <div>
      
        <div id="back-to-top-anchor" />

        <Switch>
          <Route exact path="/" component={Home} />


        </Switch>

      </div>
    </BrowserRouter>
  );
}
