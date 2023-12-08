const initialState = {
  loading: false,
  error: null,
  faqs: [],
  faq: null,
  saving: false,
  success: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FAQ_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        faqs: [],
        faq: null,
        saving: false,
      };
    case "SAVE_FAQ_START":
      return {
        ...state,
        saving: true,
        faq: null,
      };
    case "SAVE_FAQ_SUCCESS":
      return {
        ...state,
        saving: false,
        faq: action.saveData,
      };
    case "SAVE_FAQ_ERROR":
      return {
        ...state,
        saving: false,
        faq: null,
        error: action.error,
      };
    case "LOAD_FAQS_START":
      return {
        ...state,
        loading: true,
        error: null,
        faqs: [],
      };
    case "LOAD_FAQS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        faqs: action.loadData,
      };
    case "LOAD_FAQS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        faqs: [],
      };
    case "DELETE_FAQ_START":
      return {
        ...state,
        loading: true,
        error: null,
        faq: null,
      };
    case "DELETE_FAQ_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        faq: null,
      };
    case "DELETE_FAQ_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        faq: action.resultData,
      };
    case "UPDATE_FAQ_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case "UPDATE_FAQ_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        success: "Амжилттай Шинэчлэгдлээ",
      };
    case "UPDATE_FAQ_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };
    default:
      return state;
  }
};
export default reducer;
