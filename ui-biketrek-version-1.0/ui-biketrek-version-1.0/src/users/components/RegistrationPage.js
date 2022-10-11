import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import {
  Button,
  Icon,
  Segment,
  Grid,
  Input,
  Card,
  Form,
} from "semantic-ui-react";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email} . Click the link to complete your registration`
    );
    //save user email to local storage
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid columns={2}>
        <Grid.Row centered columns={4}>
          <Segment basic>
            <Grid.Column>
              <Card centered>
                <Card.Content header="Login with Email" />
                <br />
                <div>
                  <Input
                    iconPosition="left"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    focus
                  >
                    <Icon name="at" />
                    <input />
                  </Input>
                  <br />
                  <br />
                  <Button type="submit" positive>
                    Register
                  </Button>
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

export default RegistrationPage;
