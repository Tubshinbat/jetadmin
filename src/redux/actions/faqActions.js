import axios from "../../axios-base";

export const saveFaq = (data) => {
  return function (dispatch) {
    dispatch(saveFaqStart());
    axios
      .post("faqs", data)
      .then((response) => {
        const result = response.data.data;
        dispatch(saveFaqSuccess(result));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        if (error.message) {
          resError = error.message;
        }
        if (error.response.status) {
          resError = error.response.status;
        }
        if (error.response.data.error) {
          resError = error.response.data.error.message;
        }
        dispatch(saveFaqError(resError));
      });
  };
};

export const faqInit = () => {
  return {
    type: "FAQ_INIT",
  };
};

export const saveFaqStart = () => {
  return {
    type: "SAVE_FAQ_START",
  };
};

export const saveFaqError = (error) => {
  return {
    type: "SAVE_FAQ_ERROR",
    error,
  };
};

export const saveFaqSuccess = (data) => {
  return {
    type: "SAVE_FAQ_SUCCESS",
    saveData: data,
  };
};

export const loadFaqs = () => {
  return function (dispatch) {
    dispatch(loadFaqsStart());
    axios
      .get("faqs")
      .then((response) => {
        const result = response.data.data;
        dispatch(loadFaqsSuccess(result));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        if (error.message) {
          resError = error.message;
        }
        if (error.response.status) {
          resError = error.response.status;
        }
        if (error.response.data.error) {
          resError = error.response.data.error.message;
        }
        dispatch(loadFaqsError(resError));
      });
  };
};

export const loadFaqsStart = () => {
  return {
    type: "LOAD_FAQS_START",
  };
};

export const loadFaqsSuccess = (result) => {
  return {
    type: "LOAD_FAQS_SUCCESS",
    loadData: result,
  };
};

export const loadFaqsError = (error) => {
  return {
    type: "LOAD_FAQS_ERROR",
    error,
  };
};

export const deleteFaq = (id) => {
  return function (dispatch) {
    dispatch(deleteFaqStart());
    axios
      .delete(`faqs/${id}`)
      .then((response) => {
        const result = response.data.data;
        dispatch(deleteFaqSuccess(result));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        if (error.message) {
          resError = error.message;
        }
        if (error.response.status) {
          resError = error.response.status;
        }
        if (error.response.data.error) {
          resError = error.response.data.error.message;
        }
        dispatch(deleteFaqError(resError));
      });
  };
};

export const deleteFaqStart = () => {
  return {
    type: "DELETE_FAQ_START",
  };
};

export const deleteFaqSuccess = (result) => {
  return {
    type: "DELETE_FAQ_SUCCESS",
    resultData: result,
  };
};

export const deleteFaqError = (error) => {
  return {
    type: "DELETE_FAQ_ERROR",
    error,
  };
};

export const updateFaq = (id, data) => {
  return function (dispatch) {
    dispatch(updateFaqStart());
    axios
      .put(`faqs/${id}`, data)
      .then((response) => {
        const result = response.data.data;
        dispatch(updateFaqSuccess(result));
      })
      .catch((err) => {
        dispatch(updateFaqError(err.message));
      });
  };
};

export const updateFaqStart = () => {
  return {
    type: "UPDATE_FAQ_START",
  };
};

export const updateFaqSuccess = (result) => {
  return {
    type: "UPDATE_FAQ_SUCCESS",
    updateFaq: result,
  };
};

export const updateFaqError = (error) => {
  return {
    type: "UPDATE_FAQ_ERROR",
    error,
  };
};
