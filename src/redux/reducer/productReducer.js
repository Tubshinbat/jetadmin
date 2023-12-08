const initialState = {
  loading: false,
  error: null,
  success: null,
  products: [],
  paginationLast: {},
  product: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_PRODUCT":
      return {
        ...state,
        error: null,
        success: null,
      };

    case "LOAD_PRODUCT_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        products: [],
      };

    case "LOAD_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.loadProduct,
      };

    case "LOAD_PRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        products: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };
    // SAVE

    case "SAVE_PRODUCT_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "SAVE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        success: "Амжилттай нэмэгдлээ",
      };

    case "SAVE_PRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    case "DELETE_MULT_PRODUCT_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };

    case "DELETE_MULT_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };

    case "DELETE_MULT_PRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET

    case "GET_PRODUCT_START":
      return {
        ...state,
        loading: true,
        product: {},
        error: null,
      };

    case "GET_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        product: action.singleProduct,
        error: null,
      };

    case "GET_PRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        product: {},
        error: action.error,
      };

    //UPDATE
    case "UPDATE_PRODUCT_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };

    case "UPDATE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Бүтээгдэхүүний мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };

    case "UPDATE_PRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_PRODUCT_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_PRODUCT_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_PRODUCT_ERROR":
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
