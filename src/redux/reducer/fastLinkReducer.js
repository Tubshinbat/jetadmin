const initialState = {
  loading: false,
  error: null,
  success: null,
  fastlinks: [],
  paginationLast: {},
  excelData: [],
  fastlink: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_FASTLINK":
      return {
        ...state,
        error: null,
        success: null,
        fastlinks: [],
        fastlink: {},
        excelData: [],
        loading: false,
      };

    case "LOAD_FASTLINK_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        fastlinks: [],
      };

    case "LOAD_FASTLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        fastlinks: action.fastlinks,
      };

    case "LOAD_FASTLINK_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        fastlinks: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // EXCEL
    case "GET_FASTLINK_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_FASTLINK_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
        error: null,
        success: null,
      };

    case "GET_FASTLINK_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_FASTLINK_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_FASTLINK_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_FASTLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        fastlink: action.fastlink,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_FASTLINK_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "DELETE_MULT_FASTLINK_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_FASTLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_FASTLINK_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_FASTLINK_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        fastlink: {},
      };

    case "GET_FASTLINK_START":
      return {
        ...state,
        loading: true,
        fastlink: {},
        error: null,
      };

    case "GET_FASTLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        fastlink: action.fastlink,
        error: null,
      };

    case "GET_FASTLINK_ERROR":
      return {
        ...state,
        loading: false,
        fastlink: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_FASTLINK_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_FASTLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_FASTLINK_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_FASTLINK_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_FASTLINK_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_FASTLINK_ERROR":
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
