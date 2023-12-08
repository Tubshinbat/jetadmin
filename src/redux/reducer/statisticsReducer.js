const initialState = {
  loading: false,
  error: null,
  success: null,
  statistic: {},
  statistics: [],
  activeStatistic: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_INIT_STATISTICS": {
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
        statistic: {},
        statistics: [],
      };
    }

    case "LOAD_STATISTICS_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        statistics: [],
      };

    case "LOAD_STATISTICS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        statistics: action.statistics,
      };

    case "LOAD_STATISTICS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        statistics: [],
      };

    case "SAVE_STATISTICS_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "SAVE_STATISTICS_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай нэмэгдлээ",
        error: null,
      };
    case "SAVE_STATISTICS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    case "DELETE_STATISTIC_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_STATISTIC_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгалаа",
      };
    case "DELETE_STATISTIC_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };
    //GET ACTIVE
    case "GET_ACTIVE_STATISTIC_START":
      return {
        ...state,
        activeStatistic: {},
        error: null,
      };

    case "GET_ACTIVE_STATISTIC_ERROR":
      return {
        ...state,
        error: action.error,
        activeStatistic: {},
      };

    case "GET_ACTIVE_STATISTIC_SUCCESS":
      return {
        ...state,
        error: null,
        activeStatistic: action.activeStatistic,
      };

    //GET

    case "GET_STATISTIC_START":
      return {
        ...state,
        loading: true,
        statistic: {},
        error: null,
      };

    case "GET_STATISTIC_SUCCESS":
      return {
        ...state,
        loading: false,
        statistic: action.statistic,
        error: null,
      };

    case "GET_STATISTIC_ERROR":
      return {
        ...state,
        loading: false,
        statistic: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_STATISTICS_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_STATISTICS_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай Шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_STATISTICS_ERROR":
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
