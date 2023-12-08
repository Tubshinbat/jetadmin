const initialState = {
  loading: false,
  error: null,
  success: null,
  positions: [],
  paginationLast: {},
  position: {},

  selectData: {
    singleLoad: false,
    position: {
      _id: "",
    },
  },

  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_POSITION":
      return {
        ...state,
        error: null,
        success: null,
      };

    case "LOAD_POSITION_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        positions: [],
      };

    case "LOAD_POSITION_SUCCESS":
      return {
        ...state,
        loading: false,
        positions: action.positions,
      };

    case "LOAD_POSITION_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        positions: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };
    // SAVE
    case "SAVE_POSITION_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "SAVE_POSITION_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "SAVE_POSITION_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        position: action.position,
        success: "Амжилттай нэмэгдлээ",
      };
    case "SAVE_POSITION_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "DELETE_MULT_POSITION_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_POSITION_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_POSITION_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_POSITION_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        position: {},
      };

    case "GET_POSITION_START":
      return {
        ...state,
        loading: true,
        position: {},
        error: null,
      };

    case "GET_POSITION_SUCCESS":
      return {
        ...state,
        loading: false,
        position: action.position,
        error: null,
      };

    case "GET_POSITION_ERROR":
      return {
        ...state,
        loading: false,
        position: {},
        error: action.error,
      };

    case "DELETE_POSITION_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "DELETE_POSITION_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        success: "Амжилттай устгагдлаа",
      };

    case "DELETE_POSITION_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    //UPDATE
    case "UPDATE_POSITION_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_POSITION_SUCCESS":
      return {
        ...state,
        loading: false,
        success: " Амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_POSITION_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };
    case "UPDATE_END":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
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
