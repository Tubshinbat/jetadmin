const initialState = {
  loading: false,
  error: null,
  success: null,
  fact: {},
  facts: [],
  paginationLast: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_FACT": {
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
        fact: {},
        facts: [],
      };
    }

    case "LOAD_FACTS_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        facts: [],
      };

    case "LOAD_FACTS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        facts: action.facts,
      };

    case "LOAD_FACTS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        facts: [],
      };

    case "SAVE_FACT_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "SAVE_FACT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай нэмэгдлээ",
        error: null,
      };
    case "SAVE_FACT_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    case "DELETE_MULT_FACT_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_FACT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгалаа",
      };
    case "DELETE_MULT_FACT_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };
    //GET

    case "GET_FACT_START":
      return {
        ...state,
        loading: true,
        fact: {},
        error: null,
      };

    case "GET_FACT_SUCCESS":
      return {
        ...state,
        loading: false,
        fact: action.fact,
        error: null,
      };

    case "GET_FACT_ERROR":
      return {
        ...state,
        loading: false,
        fact: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_FACT_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_FACT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай Шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_FACT_ERROR":
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
