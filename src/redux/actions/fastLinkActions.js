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
    type: "CLEAR_FASTLINK",
  };
};

// SAVE FASTLINK
export const saveFastlinksInit = () => {
  return {
    type: "CREATE_FASTLINK_INIT",
  };
};

export const saveFastlinks = (data) => {
  return function (dispatch, getState) {
    dispatch(saveFastlinksStart());
    axios
      .post(`/fastlinks`, data)
      .then((response) => {
        const result = response.data;
        dispatch(saveFastlinksSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(saveFastlinksError(resError));
      });
  };
};

export const saveFastlinksStart = () => {
  return {
    type: "CREATE_FASTLINK_START",
  };
};

export const saveFastlinksSuccess = (result) => {
  return {
    type: "CREATE_FASTLINK_SUCCESS",
    fastlink: result,
  };
};

export const saveFastlinksError = (error) => {
  return {
    type: "CREATE_FASTLINK_ERROR",
    error,
  };
};

// Excel fastlink
export const getExcelData = (query) => {
  return function (dispatch) {
    dispatch(getExcelDataStart());
    axios
      .get("fastlinks/excel?" + query)
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
    type: "GET_FASTLINK_EXCELDATA_START",
  };
};

const getExcelDataSuccess = (data) => {
  return {
    type: "GET_FASTLINK_EXCELDATA_SUCCESS",
    excel: data,
  };
};

const getExcelDataError = (error) => {
  return {
    type: "GET_FASTLINK_EXCELDATA_ERROR",
    error,
  };
};

// LOAD FASTLINK

export const loadFastlinks = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadFastlinksStart());
    axios
      .get("fastlinks?" + query)
      .then((response) => {
        const loadFastlinks = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadFastlinksSuccess(loadFastlinks));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(loadFastlinksError(resError));
      });
  };
};

export const loadFastlinksStart = () => {
  return {
    type: "LOAD_FASTLINK_START",
  };
};

export const loadFastlinksSuccess = (fastlinks, pagination) => {
  return {
    type: "LOAD_FASTLINK_SUCCESS",
    fastlinks,
    pagination,
  };
};

export const loadFastlinksError = (error) => {
  return {
    type: "LOAD_FASTLINK_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultFastlinks = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("fastlinks/delete", { params: { id: ids } })
      .then((response) => {
        const deleteFastlinks = response.data.data;
        dispatch(deleteFastlinksSuccess(deleteFastlinks));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(deleteFastlinksError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_FASTLINK_START",
  };
};

export const deleteFastlinksSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_FASTLINK_SUCCESS",
    deleteFastlinks: deleteData,
  };
};

export const deleteFastlinksError = (error) => {
  return {
    type: "DELETE_MULT_FASTLINK_ERROR",
    error,
  };
};

// GET FASTLINK

export const getInit = () => {
  return {
    type: "GET_FASTLINK_INIT",
  };
};

export const getFastlinks = (id) => {
  return function (dispatch, getState) {
    dispatch(getFastlinksStart());
    axios
      .get("fastlinks/" + id)
      .then((response) => {
        const fastlink = response.data.data;
        dispatch(getFastlinksSuccess(fastlink));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getFastlinksError(resError));
      });
  };
};

export const getFastlinksStart = () => {
  return {
    type: "GET_FASTLINK_START",
  };
};

export const getFastlinksSuccess = (fastlink) => {
  return {
    type: "GET_FASTLINK_SUCCESS",
    fastlink,
  };
};

export const getFastlinksError = (error) => {
  return {
    type: "GET_FASTLINK_ERROR",
    error,
  };
};

//UPDATE FASTLINK

export const updateFastlinks = (id, data) => {
  return function (dispatch) {
    dispatch(updateFastlinksStart());
    axios
      .put(`fastlinks/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateFastlinksSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(updateFastlinksError(resError));
      });
  };
};

export const updateFastlinksStart = () => {
  return {
    type: "UPDATE_FASTLINK_START",
  };
};

export const updateFastlinksSuccess = (result) => {
  return {
    type: "UPDATE_FASTLINK_SUCCESS",
    updateFastlinks: result,
  };
};

export const updateFastlinksError = (error) => {
  return {
    type: "UPDATE_FASTLINK_ERROR",
    error,
  };
};

export const getCountFastlinks = () => {
  return function (dispatch) {
    dispatch(getCountFastlinksStart());

    axios
      .get(`fastlinks/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountFastlinksSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getCountFastlinksError(resError));
      });
  };
};

export const getCountFastlinksStart = () => {
  return {
    type: "GET_COUNT_FASTLINK_START",
  };
};

export const getCountFastlinksSuccess = (result) => {
  return {
    type: "GET_COUNT_FASTLINK_SUCCESS",
    orderCount: result,
  };
};

export const getCountFastlinksError = (error) => {
  return {
    type: "GET_COUNT_FASTLINK_ERROR",
    error,
  };
};
