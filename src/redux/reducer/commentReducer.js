const initialState = {
  loading: false,
  error: null,
  comments: null,
  paginationLast: null,
  deleteComment: null,
};
const reducer = (state = initialState, action) => {
  let spritInit = {
    ...state,
  };
  switch (action.type) {
    case "LOAD_COMMENTS_START":
      return {
        ...state,
        loading: true,
        error: null,
        comments: null,
      };
    case "LOAD_COMMENTS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        comments: action.comments,
      };
    case "LOAD_COMMENTS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        comments: null,
      };

    case "SEND_COMMENTS_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "SEND_COMMENTS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        comments: [...state.comments, action.comments],
      };
    case "SEND_COMMENTS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "LOAD_COMMENT_PAGINATION":
      return {
        ...spritInit,
        paginationLast: action.pagination,
      };

    case "DELETE_MULT_COMMENT_START":
      return {
        ...spritInit,
        deleteComment: null,
        error: null,
        loading: true,
      };
    case "DELETE_MULT_COMMENT_SUCCESS":
      return {
        ...spritInit,
        deleteComment: action.deleteComment,
        error: null,
        loading: false,
      };
    case "DELETE_MULT_COMMENT_ERROR":
      return {
        ...spritInit,
        deleteComment: null,
        error: action.deleteError,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
