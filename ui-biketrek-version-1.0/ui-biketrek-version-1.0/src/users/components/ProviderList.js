import React from "react";
import ProviderItem from "./ProviderItem";

const ProviderList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2> No Provider Found.</h2>
      </div>
    );
  }

  return (
    <ul>
      {props.items.map((provider) => (
        <ProviderItem
          key={provider.id}
          id={provider.id}
          image={provider.image}
          desc={provider.desc}
          name={provider.name}
          placeCount={provider.places}
        />
      ))}
    </ul>
  );
};

export default ProviderList;
