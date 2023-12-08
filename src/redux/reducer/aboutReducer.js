const initialState = {
  loading: false,
  error: null,
  about: null,
  updateAbout: null,
};
const reducer = (state = initialState, action) => {
  let spritInit = {
    ...state,
  };
  switch (action.type) {
    case "SAVE_ABOUT_START":
      return {
        ...spritInit,
        loading: true,
        about: null,
        error: null,
      };
    case "SAVE_ABOUT_SUCCESS":
      return {
        ...spritInit,
        loading: false,
        about: action.data,
        error: null,
      };
    case "SAVE_ABOUT_ERROR":
      return {
        ...spritInit,
        loading: false,
        about: null,
        error: action.error,
      };
    case "LOAD_ABOUT_START":
      return {
        ...spritInit,
        loading: true,
        about: null,
        error: null,
      };
    case "LOAD_ABOUT_SUCCESS":
      return {
        ...spritInit,
        loading: false,
        about: action.about,
        error: null,
      };
    case "LOAD_ABOUT_ERROR":
      return {
        ...spritInit,
        loading: false,
        about: null,
        error: action.error,
      };
    case "UPDATE_ABOUT_START":
      return {
        ...spritInit,
        loading: true,
        updateAbout: null,
        about: null,
        error: null,
      };
    case "UPDATE_ABOUT_SUCCESS":
      return {
        ...spritInit,
        loading: false,
        updateAbout: action.updateAbout,
        about: action.updateAbout,
        error: null,
      };
    case "UPDATE_ABOUT_ERROR":
      return {
        ...spritInit,
        loading: false,
        updateAbout: null,
        about: null,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
