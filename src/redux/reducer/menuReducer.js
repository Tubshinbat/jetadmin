const initialState = {
  menus: [],
  loading: false,
  error: null,
  success: null,
  menu: null,
  type: null,
  totalCount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_MENU":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
        type: null,
      };
    case "MENU_CHANGE_POSITION_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
        menus: null,
      };
    case "MENU_CHANGE_POSITION_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        success: "Өөрчлөлт хадгалагдлаа",
        menus: action.menus,
      };
    case "MENU_CHANGE_POSITION_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
        menus: null,
      };

    case "LOAD_MENUS_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "LOAD_MENUS_SUCCESS":
      return {
        ...state,
        menus: action.menus,
        loading: false,
        success: null,
        error: null,
      };

    case "LOAD_MENUS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };
    // Single menu
    case "GET_MENU_START":
      return {
        ...state,
        loading: true,
        error: null,
        menu: null,
        success: null,
      };
    case "GET_MENU_SUCCESS":
      return {
        ...state,
        menu: action.menu,
        loading: false,
        error: null,
        success: null,
      };

    case "GET_MENU_ERROR":
      return {
        ...state,
        menu: null,
        loading: false,
        error: action.error,
        success: null,
      };

    // save
    case "CREATE_MENU_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "CREATE_MENU_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай шинэ цэс нэмэгдлээ",
        error: null,
      };
    case "CREATE_MENU_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };
    case "DELETE_MENU_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        menu: null,
      };
    case "DELETE_MENU_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай цэсийг устгаллаа",
        error: null,
        menu: null,
      };
    case "DELETE_MENU_ERROR":
      return {
        ...state,
        error: action.error,
        loading: false,
        success: null,
        menu: null,
      };

    // Update
    case "UPDATE_MENU_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "UPDATE_MENU_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай цэсын нэр солигдлоо",
        error: null,
      };
    case "UPDATE_MENU_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    // GET COUNT
    case "GET_COUNT_MENU_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_MENU_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_MENU_ERROR":
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
