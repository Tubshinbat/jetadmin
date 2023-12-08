const initialState = {
  loading: false,
  error: null,
  success: null,
  books: [],
  paginationLast: {},
  excelData: [],
  book: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_BOOK":
      return {
        ...state,
        error: null,
        success: null,
        books: [],
        book: {},
        excelData: [],
        loading: false,
      };

    case "LOAD_BOOKS_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        books: [],
      };

    case "LOAD_BOOKS_SUCCESS":
      return {
        ...state,
        loading: false,
        books: action.books,
      };

    case "LOAD_BOOKS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        books: [],
        error: action.error,
      };

    case "LOAD_BOOK_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // EXCEL
    case "GET_BOOK_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_BOOK_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
        error: null,
        success: null,
      };

    case "GET_BOOK_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_BOOK_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_BOOK_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_BOOK_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        book: action.book,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_BOOK_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "DELETE_MULT_BOOK_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_BOOK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_BOOK_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_BOOK_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        book: {},
      };

    case "GET_BOOK_START":
      return {
        ...state,
        loading: true,
        book: {},
        error: null,
      };

    case "GET_BOOK_SUCCESS":
      return {
        ...state,
        loading: false,
        book: action.book,
        error: null,
      };

    case "GET_BOOK_ERROR":
      return {
        ...state,
        loading: false,
        book: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_BOOK_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_BOOK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_BOOK_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_BOOK_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_BOOK_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_BOOK_ERROR":
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
