import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_PARENT",
  };
};

// SAVE PARENT
export const saveParent = (parent) => {
  return function (dispatch, getState) {
    dispatch(saveParentStart());
    axios
      .post(`partners`, parent)
      .then((response) => {
        const result = response.data;
        dispatch(saveParentSuccess(result));
      })
      .catch((err) => {
        dispatch(saveParentError(err.message));
      });
  };
};

export const saveParentStart = () => {
  return {
    type: "SAVE_PARENT_START",
  };
};

export const saveParentSuccess = (result) => {
  return {
    type: "SAVE_PARENT_SUCCESS",
    parent: result,
  };
};

export const saveParentError = (error) => {
  return {
    type: "SAVE_PARENT_ERROR",
    error,
  };
};

// LOAD PARENT

export const loadParents = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadParentsStart());
    axios
      .get("partners?" + query)
      .then((response) => {
        const loadParent = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadParentsSuccess(loadParent));
        dispatch(loadPagination(pagination));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(loadParentsError(error.message));
      });
  };
};

export const loadParentsStart = () => {
  return {
    type: "LOAD_PARENTS_START",
  };
};

export const loadParentsSuccess = (loadParent, pagination) => {
  return {
    type: "LOAD_PARENTS_SUCCESS",
    loadParent,
    pagination,
  };
};

export const loadParentsError = (error) => {
  return {
    type: "LOAD_PARENTS_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultParent = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("partners/delete", { params: { id: ids } })
      .then((response) => {
        const deleteParent = response.data.data;
        dispatch(deleteParentSuccess(deleteParent));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(deleteParentError(error.response.data.error.message));
        } else {
          dispatch(deleteParentError(error.message));
        }
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_PARENT_START",
  };
};

export const deleteParentSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_PARENT_SUCCESS",
    deleteParent: deleteData,
  };
};

export const deleteParentError = (error) => {
  return {
    type: "DELETE_MULT_PARENT_ERROR",
    error,
  };
};

// GET PARENT

export const getParent = (id) => {
  return function (dispatch, getState) {
    dispatch(getParentStart());
    axios
      .get("partners/" + id)
      .then((response) => {
        const parent = response.data.data;
        dispatch(getParentSuccess(parent));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(getParentError(error.response.data.error.message));
        } else {
          dispatch(getParentError(error.message));
        }
      });
  };
};

export const getParentStart = () => {
  return {
    type: "GET_PARENT_START",
  };
};

export const getParentSuccess = (parent) => {
  return {
    type: "GET_PARENT_SUCCESS",
    singleParent: parent,
  };
};

export const getParentError = (error) => {
  return {
    type: "GET_PARENT_ERROR",
    error,
  };
};

//UPDATE PARENT

export const updateParent = (id, data) => {
  return function (dispatch) {
    dispatch(updateParentStart());
    axios
      .put(`partners/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateParentSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(updateParentError(err.message));
      });
  };
};

export const updateParentStart = () => {
  return {
    type: "UPDATE_PARENT_START",
  };
};

export const updateParentSuccess = (result) => {
  return {
    type: "UPDATE_PARENT_SUCCESS",
    updateParent: result,
  };
};

export const updateParentError = (error) => {
  return {
    type: "UPDATE_PARENT_ERROR",
    error,
  };
};

export const getCountParent = () => {
  return function (dispatch) {
    dispatch(getCountParentStart());
    axios
      .get(`partners/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountParentSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(getCountParentError(error));
      });
  };
};

export const getCountParentStart = () => {
  return {
    type: "GET_COUNT_PARENT_START",
  };
};

export const getCountParentSuccess = (result) => {
  return {
    type: "GET_COUNT_PARENT_SUCCESS",
    parentCount: result,
  };
};

export const getCountParentError = (error) => {
  return {
    type: "GET_COUNT_PARENT_ERROR",
    error,
  };
};
