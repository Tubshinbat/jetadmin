import axios from "../../axios-base";

export const saveAbout = (data) => {
  return function (dispatch) {
    dispatch(saveAboutStart());
    axios
      .post("about", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(saveAboutSuccess(data));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        if (error.message) {
          resError = error.message;
        }
        dispatch(saveAboutError(resError));
      });
  };
};

export const saveAboutStart = () => {
  return {
    type: "SAVE_ABOUT_START",
  };
};

export const saveAboutSuccess = (data) => {
  return {
    type: "SAVE_ABOUT_SUCCESS",
    data,
  };
};

export const saveAboutError = (error) => {
  return {
    type: "SAVE_ABOUT_ERROR",
    error,
  };
};

export const loadAbout = () => {
  return function (dispatch) {
    dispatch(loadAboutStart());
    axios
      .get("about")
      .then((response) => {
        const data = response.data.data;
        dispatch(loadAboutSuccess(data));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        if (error.message) {
          resError = error.message;
        }
        dispatch(loadAboutError(resError));
      });
  };
};

export const loadAboutStart = () => {
  return {
    type: "LOAD_ABOUT_START",
  };
};

export const loadAboutSuccess = (data) => {
  return {
    type: "LOAD_ABOUT_SUCCESS",
    about: data,
  };
};

export const loadAboutError = (error) => {
  return {
    type: "LOAD_ABOUT_ERROR",
    error,
  };
};

export const updateAbout = (id, data) => {
  return function (dispatch) {
    dispatch(updateAboutStart());
    axios
      .put(`about/${id}`, data)
      .then((response) => dispatch(updateAboutSuccess(response.data.data)))
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        if (error.message) {
          resError = error.message;
        }

        dispatch(updateAboutError(resError));
      });
  };
};

export const updateAboutStart = () => {
  return {
    type: "UPDATE_ABOUT_START",
  };
};

export const updateAboutError = (error) => {
  return {
    type: "UPDATE_ABOUT_ERROR",
    error,
  };
};

export const updateAboutSuccess = (data) => {
  return {
    type: "UPDATE_ABOUT_SUCCESS",
    updateAbout: data,
  };
};
