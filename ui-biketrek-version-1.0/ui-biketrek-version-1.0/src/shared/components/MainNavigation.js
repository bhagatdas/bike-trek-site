import React from "react";
import MainHeader from "./MainHeader";
import { Segment } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const MainNavigation = (props) => {
  return (
    <Switch>
      <Route component={MainHeader} />
    </Switch>
  );
};

export default MainNavigation;
