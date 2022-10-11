export const validateInfo = async (values) => {
  let errors = {};

  if ("title" in values && !values.title.trim()) {
    errors.title = "Title input field is required.";
  }

  if ("username" in values && !values.username.trim()) {
    errors.username = "Username required";
  }

  return errors;
};
