import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(1);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    },1000);
    count === 0 && history.push("/auth");

    return () => clearInterval(interval);
  }, [count,history]);
  return (
    <div>
     
    </div>
  );
};

export default LoadingToRedirect;
