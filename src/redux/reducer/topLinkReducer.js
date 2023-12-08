const initialState = {
  loading: false,
  error: null,
  success: null,
  toplinks: [],
  paginationLast: {},
  excelData: [],
  toplink: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_TOPLINK":
      return {
        ...state,
        error: null,
        success: null,
        toplinks: [],
        toplink: {},
        excelData: [],
        loading: false,
      };

    case "LOAD_TOPLINK_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        toplinks: [],
      };

    case "LOAD_TOPLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        toplinks: action.toplinks,
      };

    case "LOAD_TOPLINK_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        toplinks: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // EXCEL
    case "GET_TOPLINK_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_TOPLINK_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
        error: null,
        success: null,
      };

    case "GET_TOPLINK_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_TOPLINK_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_TOPLINK_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_TOPLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        toplink: action.toplink,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_TOPLINK_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "DELETE_MULT_TOPLINK_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_TOPLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_TOPLINK_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_TOPLINK_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        toplink: {},
      };

    case "GET_TOPLINK_START":
      return {
        ...state,
        loading: true,
        toplink: {},
        error: null,
      };

    case "GET_TOPLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        toplink: action.toplink,
        error: null,
      };

    case "GET_TOPLINK_ERROR":
      return {
        ...state,
        loading: false,
        toplink: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_TOPLINK_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_TOPLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_TOPLINK_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_TOPLINK_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_TOPLINK_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_TOPLINK_ERROR":
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
