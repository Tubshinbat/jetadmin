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
    type: "CLEAR_TOPLINK",
  };
};

// SAVE TOPLINK
export const saveToplinksInit = () => {
  return {
    type: "CREATE_TOPLINK_INIT",
  };
};

export const saveToplinks = (data) => {
  return function (dispatch, getState) {
    dispatch(saveToplinksStart());
    axios
      .post(`/toplinks`, data)
      .then((response) => {
        const result = response.data;
        dispatch(saveToplinksSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(saveToplinksError(resError));
      });
  };
};

export const saveToplinksStart = () => {
  return {
    type: "CREATE_TOPLINK_START",
  };
};

export const saveToplinksSuccess = (result) => {
  return {
    type: "CREATE_TOPLINK_SUCCESS",
    toplink: result,
  };
};

export const saveToplinksError = (error) => {
  return {
    type: "CREATE_TOPLINK_ERROR",
    error,
  };
};

// Excel toplink
export const getExcelData = (query) => {
  return function (dispatch) {
    dispatch(getExcelDataStart());
    axios
      .get("toplinks/excel?" + query)
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
    type: "GET_TOPLINK_EXCELDATA_START",
  };
};

const getExcelDataSuccess = (data) => {
  return {
    type: "GET_TOPLINK_EXCELDATA_SUCCESS",
    excel: data,
  };
};

const getExcelDataError = (error) => {
  return {
    type: "GET_TOPLINK_EXCELDATA_ERROR",
    error,
  };
};

// LOAD TOPLINK

export const loadToplinks = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadToplinksStart());
    axios
      .get("toplinks?" + query)
      .then((response) => {
        const loadToplinks = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadToplinksSuccess(loadToplinks));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(loadToplinksError(resError));
      });
  };
};

export const loadToplinksStart = () => {
  return {
    type: "LOAD_TOPLINK_START",
  };
};

export const loadToplinksSuccess = (toplinks, pagination) => {
  return {
    type: "LOAD_TOPLINK_SUCCESS",
    toplinks,
    pagination,
  };
};

export const loadToplinksError = (error) => {
  return {
    type: "LOAD_TOPLINK_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultToplinks = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("toplinks/delete", { params: { id: ids } })
      .then((response) => {
        const deleteToplinks = response.data.data;
        dispatch(deleteToplinksSuccess(deleteToplinks));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(deleteToplinksError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_TOPLINK_START",
  };
};

export const deleteToplinksSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_TOPLINK_SUCCESS",
    deleteToplinks: deleteData,
  };
};

export const deleteToplinksError = (error) => {
  return {
    type: "DELETE_MULT_TOPLINK_ERROR",
    error,
  };
};

// GET TOPLINK

export const getInit = () => {
  return {
    type: "GET_TOPLINK_INIT",
  };
};

export const getToplinks = (id) => {
  return function (dispatch, getState) {
    dispatch(getToplinksStart());
    axios
      .get("toplinks/" + id)
      .then((response) => {
        const toplink = response.data.data;
        dispatch(getToplinksSuccess(toplink));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getToplinksError(resError));
      });
  };
};

export const getToplinksStart = () => {
  return {
    type: "GET_TOPLINK_START",
  };
};

export const getToplinksSuccess = (toplink) => {
  return {
    type: "GET_TOPLINK_SUCCESS",
    toplink,
  };
};

export const getToplinksError = (error) => {
  return {
    type: "GET_TOPLINK_ERROR",
    error,
  };
};

//UPDATE TOPLINK

export const updateToplinks = (id, data) => {
  return function (dispatch) {
    dispatch(updateToplinksStart());
    axios
      .put(`toplinks/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateToplinksSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(updateToplinksError(resError));
      });
  };
};

export const updateToplinksStart = () => {
  return {
    type: "UPDATE_TOPLINK_START",
  };
};

export const updateToplinksSuccess = (result) => {
  return {
    type: "UPDATE_TOPLINK_SUCCESS",
    updateToplinks: result,
  };
};

export const updateToplinksError = (error) => {
  return {
    type: "UPDATE_TOPLINK_ERROR",
    error,
  };
};

export const getCountToplinks = () => {
  return function (dispatch) {
    dispatch(getCountToplinksStart());

    axios
      .get(`toplinks/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountToplinksSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getCountToplinksError(resError));
      });
  };
};

export const getCountToplinksStart = () => {
  return {
    type: "GET_COUNT_TOPLINK_START",
  };
};

export const getCountToplinksSuccess = (result) => {
  return {
    type: "GET_COUNT_TOPLINK_SUCCESS",
    orderCount: result,
  };
};

export const getCountToplinksError = (error) => {
  return {
    type: "GET_COUNT_TOPLINK_ERROR",
    error,
  };
};
