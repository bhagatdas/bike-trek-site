import axios from "axios";

export const createPost = async (post, authtoken) =>
  await axios.post(`${process.env.REACT_APP_ENGINE_API}/post`, post, {
    headers: {
      authtoken,
    },
  });