import React from "react";
import ProviderList from "../components/ProviderList";

const Provider = () => {
  const provider = [
    {
      id: "u2",
      name: "Shimla Hill Station",
      image:
        "https://www.couponraja.in/theroyale/wp-content/uploads/2017/09/Darjeeling-1.jpg",
      places: 4,
      desc:
        "Shimla hill station is still the colonial summer capital (resort) to which British used to retreat in when heat of Indio-Gangetic plains used to become unbearable.",
    },
  ];

  return <ProviderList items={provider} />;
};

export default Provider;
