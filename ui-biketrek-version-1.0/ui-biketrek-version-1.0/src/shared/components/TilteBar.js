import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { Header, Segment, Button, Icon, Label, Image, Dropdown, Menu} from "semantic-ui-react";
import logo from '../../images/logo.png';

const TitleBar = () => {
  const [current, setCurrent] = useState("login");

  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  const logoutClick = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/");
  };

  return (
    <Segment clearing>
      <Header as="h2" floated="right">
        <div>
        <Menu size="small" floated="right">
            <Menu.Menu position="right">
              <Dropdown item text="Language">
                <Dropdown.Menu>
                  <Dropdown.Item>Account Setting</Dropdown.Item>
                  <Dropdown.Item>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Menu.Item>
                <Button primary>Sign Up</Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          {user && <Button floated="left">Welcome : {user.name}</Button>}
          {!user && (
            <Button floated="left" as={Link} to="/auth">
              <Icon name="user" />
              Login
            </Button>
          )}

          {user && (
            <Button floated="left" onClick={logoutClick}>
              <Icon name="power off" />
              Logout
            </Button>
          )}

          <Button floated="right">
            <Icon name="call" />
            Contact Us
          </Button>
        </div>
      </Header>
      <Header as="h2" floated="left">
        <Image src={logo} size="small" />
      </Header>
    </Segment>
  );
};

export default TitleBar;
