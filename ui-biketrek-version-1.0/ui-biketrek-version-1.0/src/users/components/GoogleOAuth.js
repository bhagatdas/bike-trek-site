import React, { useEffect, useState } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import {
  Button,
  Icon,
  Segment,
  Grid,
  Input,
  Card,
  Divider,
  Header,
  Form,
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/Auth";
import { useDispatch, useSelector } from "react-redux";

const GoogleOAuth = ({ history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);
  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/");
    } else {
      history.push("/");
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  let dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
        })
        .catch((err) => console.log(err));

      history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
      history.push("/auth");
    }
  };

  const googleLogin = async () => {
    setGoogleLoading(true);
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            console.log("RES ", res);
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
            roleBasedRedirect(res);
          })
          .catch((err) => console.log("EROR ", err));
        setGoogleLoading(false);
      })
      .catch((err) => {
        setGoogleLoading(false);
        console.log(err);
        toast.error(err.message);
        history.push("/auth");
      });
  };

  return (
    <Grid centered columns={2}>
      <Grid.Row centered columns={4}>
        <Segment basic>
          <Grid.Column>
            <Card centered>
              <Card.Content header="Login with Google" />
              <Card.Content>
                <Button color="google plus" onClick={googleLogin} loading={googleLoading} > <Icon name="google plus" /> Google Plus{" "} </Button>
              </Card.Content>
              <Divider horizontal>Or</Divider>
              <Header as="h3">Login with Email</Header>
              <br />
              <Form onSubmit={handleSubmit}>
                <div>
                  <Input type="email" iconPosition="left" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} > <Icon name="at" /> <input />{" "} </Input>
                  <br />
                  <br />
                  <Input type="password " iconPosition="left" placeholder="Password" value={password} onChange={(p) => setPassword(p.target.value)} > <Icon name="eye" /> <input />{" "} </Input>
                  <br />
                  <br />
                  <Button type="submit" positive loading={loading}> login{" "} </Button>
                </div>
              </Form>
              <br />
              <Button.Group>
                <Button as={Link} to="/register"> New User ?{" "} </Button> <Button.Or /> <Button as={Link} to="/forgot-password"> Forgot pass ?{" "} </Button>
              </Button.Group>
              <br />
            </Card>
          </Grid.Column>
        </Segment>
      </Grid.Row>
    </Grid>
  );
};

export default GoogleOAuth;
