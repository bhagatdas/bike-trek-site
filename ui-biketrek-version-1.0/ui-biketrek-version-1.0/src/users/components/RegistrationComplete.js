import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import {
  Button,
  Icon,
  Segment,
  Grid,
  Input,
  Card,
  Form,
} from "semantic-ui-react";

import { createOrUpdateUser } from "../../functions/Auth";

const RegistrationComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let dispatch = useDispatch();

  useEffect(() => {
    console.log(
      "storage =",
      window.localStorage.getItem("emailForRegistration")
    );
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("email =", email);
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        //removing usermail from local storage
        //window.localStorage.removeItem("emailForRegistration");
        let user = auth.currentUser;
        await user.updatePassword(password);
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
          .catch();
        history.push("/");
      }
    } catch (err) {
      console.log("err ", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid centered columns={2}>
        <Grid.Row centered columns={4}>
          <Segment basic>
            <Grid.Column>
              <Card centered>
                <Card.Content header="Enter your password. " />
                <br />
                <div>
                  <Input type="email" iconPosition="left" placeholder="Email" value={email} > <Icon name="at" /> <input /> </Input>
                  <br />
                  <br />
                  <Input type="password" iconPosition="left" placeholder="Password" value={password} onChange={(p) => setPassword(p.target.value)} > <Icon name="eye" /> <input /> </Input>
                  <br />
                  <br />
                  <Button type="submit" positive> Complete Registration </Button>
                </div>
                <br />
                <br />
              </Card>
            </Grid.Column>
          </Segment>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default RegistrationComplete;
