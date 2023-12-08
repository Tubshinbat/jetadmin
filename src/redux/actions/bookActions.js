import axios from "../../axios-base";

const errorBuild = (error) => {
  let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

  if (resError) {
    resError = error.message;
  }

  if (error.response !== undefined && error.response.status !== undefined) {
    resError = error.response.status;
  }
  if (
    error.response !== undefined &&
    error.response.data !== undefined &&
    error.response.data.error !== undefined
  ) {
    resError = error.response.data.error.message;
  }
  return resError;
};

export const clear = () => {
  return {
    type: "CLEAR_BOOK",
  };
};

// SAVE BOOK
export const saveBookInit = () => {
  return {
    type: "CREATE_BOOK_INIT",
  };
};

export const saveBook = (data) => {
  return function (dispatch) {
    dispatch(saveBookStart());
    axios
      .post(`/books`, data)
      .then((response) => {
        const result = response.data;
        dispatch(saveBookSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(saveBookError(resError));
      });
  };
};

export const saveBookStart = () => {
  return {
    type: "CREATE_BOOK_START",
  };
};

export const saveBookSuccess = (result) => {
  return {
    type: "CREATE_BOOK_SUCCESS",
    book: result,
  };
};

export const saveBookError = (error) => {
  return {
    type: "CREATE_BOOK_ERROR",
    error,
  };
};

// Excel book
export const getExcelData = (query) => {
  return function (dispatch) {
    dispatch(getExcelDataStart());
    axios
      .get("books/excel?" + query)
      .then((response) => {
        const data = response.data.data;
        dispatch(getExcelDataSuccess(data));
      })
      .catch((error) => {
        let resError = errorBuild(error);
        dispatch(getExcelDataError(resError));
      });
  };
};

const getExcelDataStart = () => {
  return {
    type: "GET_BOOK_EXCELDATA_START",
  };
};

const getExcelDataSuccess = (data) => {
  return {
    type: "GET_BOOK_EXCELDATA_SUCCESS",
    excel: data,
  };
};

const getExcelDataError = (error) => {
  return {
    type: "GET_BOOK_EXCELDATA_ERROR",
    error,
  };
};

// LOAD BOOK

export const loadBook = (query = "") => {
  return function (dispatch) {
    dispatch(loadBookStart());
    axios
      .get("/books?" + query)
      .then((response) => {
        const loadBook = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadBookSuccess(loadBook));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(loadBookError(resError));
      });
  };
};

export const loadBookStart = () => {
  return {
    type: "LOAD_BOOKS_START",
  };
};

export const loadBookSuccess = (books, pagination) => {
  return {
    type: "LOAD_BOOKS_SUCCESS",
    books,
    pagination,
  };
};

export const loadBookError = (error) => {
  return {
    type: "LOAD_BOOKS_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_BOOK_PAGINATION",
    pagination,
  };
};

export const deleteMultBook = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("books/delete", { params: { id: ids } })
      .then((response) => {
        const deleteBook = response.data.data;
        dispatch(deleteBookSuccess(deleteBook));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(deleteBookError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_BOOK_START",
  };
};

export const deleteBookSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_BOOK_SUCCESS",
    deleteBook: deleteData,
  };
};

export const deleteBookError = (error) => {
  return {
    type: "DELETE_MULT_BOOK_ERROR",
    error,
  };
};

// GET BOOK

export const getInit = () => {
  return {
    type: "GET_BOOK_INIT",
  };
};

export const getBook = (id) => {
  return function (dispatch) {
    dispatch(getBookStart());
    axios
      .get("books/" + id)
      .then((response) => {
        const book = response.data.data;
        dispatch(getBookSuccess(book));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getBookError(resError));
      });
  };
};

export const getBookStart = () => {
  return {
    type: "GET_BOOK_START",
  };
};

export const getBookSuccess = (book) => {
  return {
    type: "GET_BOOK_SUCCESS",
    book,
  };
};

export const getBookError = (error) => {
  return {
    type: "GET_BOOK_ERROR",
    error,
  };
};

//UPDATE BOOK

export const updateBook = (id, data) => {
  return function (dispatch) {
    dispatch(updateBookStart());
    axios
      .put(`books/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateBookSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(updateBookError(resError));
      });
  };
};

export const updateBookStart = () => {
  return {
    type: "UPDATE_BOOK_START",
  };
};

export const updateBookSuccess = (result) => {
  return {
    type: "UPDATE_BOOK_SUCCESS",
    updateBook: result,
  };
};

export const updateBookError = (error) => {
  return {
    type: "UPDATE_BOOK_ERROR",
    error,
  };
};

export const getCountBook = () => {
  return function (dispatch) {
    dispatch(getCountBookStart());

    axios
      .get(`books/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountBookSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getCountBookError(resError));
      });
  };
};

export const getCountBookStart = () => {
  return {
    type: "GET_COUNT_BOOK_START",
  };
};

export const getCountBookSuccess = (result) => {
  return {
    type: "GET_COUNT_BOOK_SUCCESS",
    orderCount: result,
  };
};

export const getCountBookError = (error) => {
  return {
    type: "GET_COUNT_BOOK_ERROR",
    error,
  };
};
