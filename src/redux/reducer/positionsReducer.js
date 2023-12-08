const initialState = {
  positions: [],
  loading: false,
  error: null,
  success: null,
  position: null,
  type: null,
  totalCount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_POSITION":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
        type: null,
      };
    case "POSITION_CHANGE_POSITION_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
        positions: null,
      };
    case "POSITION_CHANGE_POSITION_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        success: "Өөрчлөлт хадгалагдлаа",
        positions: action.positions,
      };
    case "POSITION_CHANGE_POSITION_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
        positions: null,
      };

    case "LOAD_POSITIONS_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "LOAD_POSITIONS_SUCCESS":
      return {
        ...state,
        positions: action.positions,
        loading: false,
        success: null,
        error: null,
      };

    case "LOAD_POSITIONS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };
    // Single position
    case "GET_POSITION_START":
      return {
        ...state,
        loading: true,
        error: null,
        position: null,
        success: null,
      };
    case "GET_POSITION_SUCCESS":
      return {
        ...state,
        position: action.position,
        loading: false,
        error: null,
        success: null,
      };

    case "GET_POSITION_ERROR":
      return {
        ...state,
        position: null,
        loading: false,
        error: action.error,
        success: null,
      };

    // save
    case "CREATE_POSITION_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "CREATE_POSITION_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай шинэ цэс нэмэгдлээ",
        error: null,
      };
    case "CREATE_POSITION_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };
    case "DELETE_POSITION_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        position: null,
      };
    case "DELETE_POSITION_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгаллаа",
        error: null,
        position: null,
      };
    case "DELETE_POSITION_ERROR":
      return {
        ...state,
        error: action.error,
        loading: false,
        success: null,
        position: null,
      };

    // Update
    case "UPDATE_POSITION_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "UPDATE_POSITION_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай цэсын нэр солигдлоо",
        error: null,
      };
    case "UPDATE_POSITION_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    // GET COUNT
    case "GET_COUNT_POSITION_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_POSITION_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_POSITION_ERROR":
      return {
        ...state,
        countLoading: false,
        totalCount: null,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
