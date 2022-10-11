import React from "react";
import PlaceItem from "./PlaceItem";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div class="ui divided items">
        <div class="item">
          <div class="image"></div>
          <div class="content">
            <a class="header">No places found</a>
            <div class="meta"></div>
            <div class="description"></div>
            <div class="extra"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ul>
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          image={place.image}
          title={place.title}
          duration={place.duration}
          provider={place.provider}
          location={place.location}
          difficulty={place.difficulty}
          days={place.days}
          description={place.description}
        />
      ))}
      ;
    </ul>
  );
};

export default PlaceList;
