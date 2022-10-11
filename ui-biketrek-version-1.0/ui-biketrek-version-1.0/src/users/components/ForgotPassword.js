import React, { useState ,useEffect} from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  Button,
  Icon,
  Segment,
  Grid,
  Input,
  Card,
  Form,
} from "semantic-ui-react";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  // useEffect(() => {
  //   if (user && user.token) history.push("/");
  // }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Please check your mail for the reset link");
      })
      .catch((e) => {
        setLoading(false);
        toast.error(e.message);
        console.log(e);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid columns={2}>
        <Grid.Row centered columns={4}>
          <Segment basic>
            <Grid.Column>
              <Card centered>
                <Card.Content header="Enter your Email" />
                <br />
                <div>
                  <Input iconPosition="left" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} focus >
                    <Icon name="at" />
                    <input />
                  </Input>
                  <br />
                  <br />
                  <Button type="submit" positive loading={loading}> Reset </Button>
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

export default ForgotPassword;
