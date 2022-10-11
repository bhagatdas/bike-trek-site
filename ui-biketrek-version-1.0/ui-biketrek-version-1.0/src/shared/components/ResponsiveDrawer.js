import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import useStyles from "./css/MICss";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { Button, Dropdown, Menu } from "semantic-ui-react";

const ResponsiveDrawer = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
  let history = useHistory();
  const [isPicThere, setIsPicThere] = useState(false);

  const [activeItem, setaActiveItem] = useState("home");

  const handleItemClick = (e, { name }) => {
    setaActiveItem(name);
  };

  useEffect(() => {
    if (user && user.picture) {
      setIsPicThere(true);
    }
    return () => {};
  }, [user]);

  const logoutClick = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/");
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
    <Divider/>
    <Menu secondary vertical>
        <Menu.Item
          name='account'
         
          onClick={handleItemClick}
        />
        <Menu.Item
          name='settings'
          
          onClick={handleItemClick}
        />
        <Dropdown item text='Display Options'>
          <Dropdown.Menu>
            <Dropdown.Header>Text Size</Dropdown.Header>
            <Dropdown.Item>Small</Dropdown.Item>
            <Dropdown.Item>Medium</Dropdown.Item>
            <Dropdown.Item>Large</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
      
      </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Menu fixed="top">
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="textPrimary" style={{ flex: 1 }}>
              LOGO
            </Typography>
            {user && !isPicThere && (
              <Avatar className={classes.orange}>{user.name.charAt(0)}</Avatar>
            )}
            {user && isPicThere && (
              <Avatar
                className={classes.orange}
                alt={user.name}
                src={user.picture}
              />
            )}
            {user && (
              <Menu size="small" floated="right">
                <Menu.Menu position="right">
                  <Dropdown item text={"Hi " + user.name}>
                    <Dropdown.Menu>
                      <Dropdown.Item>Account Setting</Dropdown.Item> <Dropdown.Item onClick={logoutClick}> Logout </Dropdown.Item> {user && user.role === "organizer" && ( <Dropdown.Item as={Link} to="/admin-dashboard"> Organizer DashBorad </Dropdown.Item> )}
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Menu>
              </Menu>
            )}
            {!user && (
              <Button primary size="tiny" as={Link} to="/auth">
                Sign Up
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Menu>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.Children}
      </main>
    </div>
  );
};

export default ResponsiveDrawer;
