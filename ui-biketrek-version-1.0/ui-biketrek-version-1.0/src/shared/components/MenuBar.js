import React, { Component, useState } from "react";
import { Menu, Input, Dropdown } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MenuBar = () => {
  const [activeItem, setaActiveItem] = useState("home");

  let { user } = useSelector((state) => ({ ...state }));

  const handleItemClick = (e, { name }) => {
    setaActiveItem(name);
  };

  return (
    <Menu>
      <Menu.Item name="home" as={Link} to="/" active={activeItem === "home"} content="Home" onClick={handleItemClick} />
      <Menu.Item name="biking" as={Link} to="/biking" active={activeItem === "biking"} content="Biking" onClick={handleItemClick} />
      <Menu.Item name="trekking" as={Link} to="/trekking" active={activeItem === "trekking"} content="Trekking" onClick={handleItemClick} />
      {user && ( <Menu.Item name="friends" as={Link} to="/friends" active={activeItem === "friends"} content="Friends" onClick={handleItemClick} /> )}
      <Menu.Item name="articles" as={Link} to="/articles" active={activeItem === "articles"} content="Articles" onClick={handleItemClick} />
      {user && (
        <Dropdown item text="More">
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/profile-setting">Account Setting</Dropdown.Item>
            <Dropdown.Item as={Link} to="/organizer">Be a Organizer</Dropdown.Item>
            {user && user.role === 'organizer' && (<Dropdown.Item as={Link} to="/admin">Organizer Dashboard</Dropdown.Item>)}
          </Dropdown.Menu>
        </Dropdown>
      )}
      <Menu.Menu position="right">
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default MenuBar;
