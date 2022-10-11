import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_ENGINE_API}/adduser`,
    {},
    {
      headers: {
        authToken: authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_ENGINE_API}/current-user`,
    {},
    {
      headers: {
        authToken: authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_ENGINE_API}/current-admin`,
    {},
    {
      headers: {
        authToken: authtoken,
      },
    }
  );
};

export const updateUser = async (authtoken, userDetail) => {
  return await axios.post(
    `${process.env.REACT_APP_ENGINE_API}/updateuser`,
    { detail: userDetail },
    {
      headers: {
        authToken: authtoken,
      },
    }
  );
};
