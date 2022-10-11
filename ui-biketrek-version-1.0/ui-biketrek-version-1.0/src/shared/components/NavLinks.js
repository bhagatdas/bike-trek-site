import React, { Component, useState } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavLink = () => {
  const [activeItem, setaActiveItem] = useState("home");

  let { user } = useSelector((state) => ({ ...state }));

  const handleItemClick = (e, { name }) => {
    setaActiveItem(name);
  };

  return (
    <Menu pointing vertical floated="right">
      <Menu.Item
        name="home"
        as={Link}
        to="/"
        active={activeItem === "home"}
        onClick={handleItemClick}
      />
      <Menu.Item
        name="Biking"
        as={Link}
        to="/biking"
        active={activeItem === "Biking"}
        onClick={handleItemClick}
      />
      <Menu.Item
        name="Trekking"
        as={Link}
        to="/trekking"
        active={activeItem === "Trekking"}
        onClick={handleItemClick}
      />
      {user && (
        <Menu.Item
          name="friends"
          as={Link}
          to="/friends"
          active={activeItem === "friends"}
          onClick={handleItemClick}
        />
      )}

      <Menu.Item
        name="Articles"
        as={Link}
        to="/articles"
        active={activeItem === "Articles"}
        onClick={handleItemClick}
      />
      {user && (
        <Dropdown item text="More">
          <Dropdown.Menu>
            <Dropdown.Item
              icon="edit"
              text="Edit Profile"
              as={Link}
              to="/profile-setting"
            />
            <Dropdown.Item
              icon="settings"
              text="Account Settings"
              as={Link}
              to="/account-setting"
            />
          </Dropdown.Menu>
        </Dropdown>
      )}

      {user && (
        <Menu.Item>
          <Menu.Menu>
            <Menu.Item
              name="email"
              active={activeItem === "email"}
              onClick={handleItemClick}
            >
              Be a Travell Organizer
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default NavLink;
