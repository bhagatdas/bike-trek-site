import axios from "axios";

export const uploadImage = (uri, authtoken) =>
  axios.post(`${process.env.REACT_APP_ENGINE_API}/upload-images`, {image :uri}, {
    headers: {
      authtoken,
    },
  });
