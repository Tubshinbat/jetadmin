import axios from "../../axios-base";

// LoadStar

export const loadComments = (query) => {
  return function (dispatch) {
    dispatch(loadCommentsStart());
    axios
      .get(`/comments/p?${query}`)
      .then((response) => {
        const comments = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadPagination(pagination));
        dispatch(loadCommentsSuccess(comments));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        if (error.message) resError = error.message;
        dispatch(loadCommentsError(resError));
      });
  };
};

export const loadCommentsStart = () => {
  return {
    type: "LOAD_COMMENTS_START",
  };
};

export const loadCommentsSuccess = (comments) => {
  return {
    type: "LOAD_COMMENTS_SUCCESS",
    comments,
  };
};

export const loadCommentsError = (error) => {
  return {
    type: "LOAD_COMMENTS_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_COMMENT_PAGINATION",
    pagination,
  };
};

// Comment send

export const sendComment = (data) => {
  return function (dispatch) {
    dispatch(sendCommentStart());
    axios
      .post(`/comments`, data)
      .then((response) => {
        const comments = response.data.data;
        dispatch(sendCommentSuccess(comments));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        if (error.message) resError = error.message;
        dispatch(sendCommentError(resError));
      });
  };
};

export const sendCommentStart = () => {
  return {
    type: "SEND_COMMENTS_START",
  };
};

export const sendCommentSuccess = (comments) => {
  return {
    type: "SEND_COMMENTS_SUCCESS",
    comments,
  };
};

export const sendCommentError = (error) => {
  return {
    type: "SEND_COMMENTS_ERROR",
    error,
  };
};

export const deleteMultComment = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("comments/multDelete", { params: { id: ids } })
      .then((response) => {
        const deleteComment = response.data.data;
        dispatch(deleteCommentSuccess(deleteComment));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        if (error.message) {
          resError = error.message;
        }
        dispatch(deleteCommentError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_COMMENT_START",
  };
};

export const deleteCommentSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_COMMENT_SUCCESS",
    deleteComment: deleteData,
  };
};

export const deleteCommentError = (error) => {
  return {
    type: "DELETE_MULT_COMMENT_ERROR",
    deleteError: error,
  };
};
