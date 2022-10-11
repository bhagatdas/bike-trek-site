import React from "react";
import { Segment } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import LatestList from "../components/LatestList";

const LatestListPage = () => {
  return (
    <Router>
      <Route component={LatestList} />
    </Router>
  );
};

export default LatestListPage;
