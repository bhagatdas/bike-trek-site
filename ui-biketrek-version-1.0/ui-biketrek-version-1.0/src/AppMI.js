import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ResponsiveDrawer from "./shared/components/ResponsiveDrawer";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { currentUser } from "./functions/Auth";
import GoogleOAuth from "./users/components/GoogleOAuth";
import RegistrationPage from "./users/components/RegistrationPage";
import RegistrationComplete from "./users/components/RegistrationComplete";
import ForgotPassword from "./users/components/ForgotPassword";
import ProfileSetting from "./users/components/ProfileSetting";
import Places from "./places/pages/Places";
import { CssBaseline } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import { Container, Segment } from "semantic-ui-react";
import MenuBar from "./shared/components/MenuBar";
import OrganizerList from "./users/components/OrganizerList";
import AdminDashboard from "./users/admin/AdminDashboard";
import AdminRoutes from "./shared/routes/AdminRoutes";
import UserRoute from "./shared/routes/UserRoutes";
import AdminMenuBar from "./shared/components/AdminMenuBar";
import CategoryCreate from "./users/admin/category/CategoryCreate";
import logo from './images/footer.png';
import './sticky.css';
import PostCreate from "./users/admin/post/PostCreate";


const App = () => {
  const dispatch = useDispatch();
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
  }, [dispatch]);

  return (
    <div>
      <Container>
    
        <ResponsiveDrawer />
        <ToastContainer />
        <Hidden smDown implementation="css">
           <Route exact path={["/", "/profile-setting"]} component={MenuBar} />
           <Route AdminRoutes exact path={["/admin","/admin/add-category","/admin/add-post"]} component={AdminMenuBar} />
        </Hidden>
        <Route exact path="/" component={OrganizerList} />
        <Route exact path="/auth" component={GoogleOAuth} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/register-complete" component={RegistrationComplete} />
        <Segment basic></Segment>
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/profile-setting" component={ProfileSetting} />
        <Route exact path="/:id/places" component={Places} />
        <Switch>
          <AdminRoutes AdminRoutes exact path="/admin/add-category" component={CategoryCreate} />
          <AdminRoutes AdminRoutes exact path="/admin" component={AdminDashboard} />
          <AdminRoutes AdminRoutes exact path="/admin/add-post" component={PostCreate} /> 
        </Switch>  
        </Container>
        <div class="item shark-3">
        <img src={logo} width="400" alt="Sammy the Shark with a dinosaur theme."/>
        </div>
        </div>
  );
};

export default App;
