import React from "react";
import { Button, Icon, Image, Item, Label,Segment } from 'semantic-ui-react'

const PlaceItem = (props) => {
  return (
    <Segment raised>
      <Item.Group divided>
        <Item>
          <Item.Image src={props.image} alt={props.name} />

          <Item.Content>
            <Item.Header as="a">{props.title}</Item.Header>
            <Item.Meta>
              <span className="cinema">{props.name}</span>
            </Item.Meta>
            <Item.Description>{props.description}</Item.Description>
            <Item.Extra>
              <Label>IMAX</Label>
              <Label icon="globe" content="Additional Languages" />
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};

export default PlaceItem;
