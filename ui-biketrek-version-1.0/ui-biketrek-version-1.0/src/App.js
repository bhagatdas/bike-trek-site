import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TitleBar from "./shared/components/TilteBar";
import ResponsiveDrawer from "./shared/components/ResponsiveDrawer";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { currentUser } from "./functions/Auth";
import MainNavigation from "./shared/components/MainNavigation";
import UserRoute from "./shared/routes/UserRoutes";
import GoogleOAuth from "./users/components/GoogleOAuth";
import RegistrationPage from "./users/components/RegistrationPage";
import RegistrationComplete from "./users/components/RegistrationComplete";
import ForgotPassword from "./users/components/ForgotPassword";
import ProfileSetting from "./users/components/ProfileSetting";
import LatestListPage from "./shared/pages/LatestListPage";
import { Grid, Segment, Image, Rail } from "semantic-ui-react";
import Provider from "./users/pages/Provider";
import Places from "./places/pages/Places";
import { CssBaseline } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import useStyles from "./shared/components/css/MICss";

const App = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                picture: res.data.picture,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <CssBaseline />

      <ResponsiveDrawer />
      <Route path="/profile-setting" exact component={ProfileSetting} />
      <Switch>
        <Route path="/auth" exact component={GoogleOAuth} />
        <Route path="/register" exact component={RegistrationPage} />
        <Route
          path="/register-complete"
          exact
          component={RegistrationComplete}
        />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <Grid columns="equal" verticalAlign="top">
          <Grid.Column width={4}>
            <Hidden smDown implementation="css">
              <Route
                path={["/profile-setting", "/", "/:id/places"]}
                exact
                component={MainNavigation}
              />
            </Hidden>
          </Grid.Column>
          <Grid.Column width={8}>
            <Route path="/" exact component={Provider} />
            <Route path="/:id/places" exact component={Places} />

           
          </Grid.Column>
          <Grid.Column>
            <Segment basic>
              <Route path="/" exact component={LatestListPage} />
            </Segment>
          </Grid.Column>
        </Grid>
        
      </Switch>
    </div>
  );
};

export default App;
