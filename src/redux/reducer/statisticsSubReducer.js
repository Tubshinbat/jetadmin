const initialState = {
  loading: false,
  error: null,
  success: null,
  subStatistic: {},
  subStatistics: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_INIT_STATISTIC_SUB":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
        subStatistic: {},
        subStatistics: [],
      };
    case "LOAD_STATISTICS_SUB_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        subStatistics: [],
      };

    case "LOAD_STATISTICS_SUB_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        subStatistics: action.statisticsSub,
      };

    case "LOAD_STATISTICS_SUB_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        subStatistics: [],
      };

    case "SAVE_STATISTIC_SUB_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "SAVE_STATISTIC_SUB_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай нэмэгдлээ",
        error: null,
      };
    case "SAVE_STATISTIC_SUB_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    case "DELETE_STATISTIC_SUB_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_STATISTIC_SUB_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгалаа",
      };
    case "DELETE_STATISTIC_SUB_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET

    case "GET_STATISTIC_SUB_START":
      return {
        ...state,
        loading: true,
        subStatistic: {},
        error: null,
      };

    case "GET_STATISTIC_SUB_SUCCESS":
      return {
        ...state,
        loading: false,
        subStatistic: action.statisticSub,
        error: null,
      };

    case "GET_STATISTIC_SUB_ERROR":
      return {
        ...state,
        loading: false,
        subStatistic: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_STATISTICS_SUB_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_STATISTICS_SUB_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай Шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_STATISTICS_SUB_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
