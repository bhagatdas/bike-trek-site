import React from "react";
import { Link } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import {
  Button,
  Icon,
  Image,
  Item,
  Label,
  Rating,
  Segment,
  Header,
} from "semantic-ui-react";


const ProviderItem = (props) => {
  return (
   
    
      <Segment raised>
      
      <Item.Group divided>
        <Item>
          <Item.Image src={props.image} alt={props.name} as={Link} to={`/${props.id}/places`}/>

          <Item.Content>
            <Item.Header as={Link} to={`/${props.id}/places`}>{props.name}</Item.Header>
            <Item.Meta>
              <span className="cinema">{props.name}</span>
            </Item.Meta>
            <Item.Description>{props.desc}</Item.Description>
            <Item.Extra>
            <Label as="a" color="red" tag>
                  Upcoming
            </Label>
            <Label as="a" color="teal" tag>
                  Featured
            </Label>
            <br/>
            <Rating icon="star" defaultRating={3} maxRating={5} />
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};

export default ProviderItem;
