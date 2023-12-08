import axios from "../../axios-base";

export const clear = () => {
  return function (dispatch, getState) {
    dispatch(clearStart);
    dispatch(loadPositions);
  };
};

const errorMessage = (error) => {
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

export const clearStart = () => {
  return {
    type: "CLEAR_POSITION",
  };
};

export const loadPositions = () => {
  return function (dispatch, getState) {
    dispatch(loadPositionsStart());
    axios
      .get("positions")
      .then((response) => {
        const result = response.data.data;
        dispatch(loadPositionsSuccess(result));
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(loadPositionsError(resultError));
      });
  };
};
export const loadPositionsStart = () => {
  return {
    type: "LOAD_POSITIONS_START",
  };
};

export const loadPositionsSuccess = (result) => {
  return {
    type: "LOAD_POSITIONS_SUCCESS",
    positions: result,
  };
};

export const loadPositionsError = (error) => {
  return {
    type: "LOAD_POSITIONS_ERROR",
    error,
  };
};

// SINGLE CATEGORY

export const getPosition = (id) => {
  return function (dispatch, getState) {
    dispatch(getPositionStart());
    axios
      .get(`positions/${id}`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getPositionSuccess(result));
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(getPositionError(resultError));
      });
  };
};

export const getPositionStart = () => {
  return {
    type: "GET_POSITION_START",
  };
};

export const getPositionSuccess = (result) => {
  return {
    type: "GET_POSITION_SUCCESS",
    position: result,
  };
};

export const getPositionError = (error) => {
  return {
    type: "GET_POSITION_ERROR",
    error,
  };
};

// Change positions
export const changePosition = (data) => {
  return function (dispatch) {
    dispatch(changePositionStart());

    axios
      .post("positions/change", data)
      .then((response) => {
        const result = response.data.data;
        dispatch(changePositionSuccess(result));
        dispatch(loadPositions());
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(changePositionError(resultError));
      });
  };
};

export const changePositionStart = (result) => {
  return {
    type: "POSITIONS_CHANGE_POSITION_START",
  };
};

export const changePositionSuccess = (data) => {
  return {
    type: "POSITIONS_CHANGE_POSITION_SUCCESS",
    positions: data,
  };
};

export const changePositionError = (error) => {
  return {
    type: "POSITIONS_CHANGE_POSITION_ERROR",
    error: error,
  };
};

// DELETE CATEGORY

export const deletePosition = (positionId, data) => {
  return function (dispatch, getState) {
    dispatch(deletePositionStart());

    axios
      .delete(`positions/${positionId}`, data)
      .then((response) => {
        const resultPosition = response.data.data;
        dispatch(deletePositionSuccess(resultPosition));
        dispatch(loadPositions());
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(deletePositionError(resultError));
      });
  };
};

export const deletePositionStart = () => {
  return {
    type: "DELETE_POSITION_START",
  };
};

export const deletePositionSuccess = (result) => {
  return {
    type: "DELETE_POSITION_SUCCESS",
    dlPosition: result,
  };
};

export const deletePositionError = (error) => {
  return {
    type: "DELETE_POSITION_ERROR",
    error,
  };
};

// SAVE CATEGORY

export const savePosition = (position) => {
  return function (dispatch, getState) {
    dispatch(savePositionStart());
    let data = {
      name: position.name,
      status: position.status,
      isDirect: position.isDirect,
      isModel: position.isModel,
      model: position.model,
      direct: position.direct,
      cover: position.cover,
    };

    if (position.parentId !== null) {
      data = {
        name: position.name,
        parentId: position.parentId,
        isDirect: position.isDirect,
        isModel: position.isModel,
        model: position.model,
        direct: position.direct,
        cover: position.cover,
      };
    }

    data.language = position.language;
    data.status = position.status;

    axios
      .post(`positions`, data)
      .then((response) => {
        const resultPosition = response.data.data;
        dispatch(savePositionSuccess(resultPosition));
        dispatch(loadPositions());
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(savePositionError(resultError));
      });
  };
};

export const savePositionStart = () => {
  return {
    type: "CREATE_POSITION_START",
  };
};

export const savePositionSuccess = (resultPosition) => {
  return {
    type: "CREATE_POSITION_SUCCESS",
  };
};

export const savePositionError = (error) => {
  return {
    type: "CREATE_POSITION_ERROR",
    error: error,
  };
};

// UPDATE CATEGORY

export const updatePosition = (position, id) => {
  return function (dispatch) {
    dispatch(updatePositionStart());

    axios
      .put(`positions/${id}`, position)
      .then((response) => {
        const resultPosition = response.data.data;
        dispatch(updatePositionSuccess(resultPosition));
        dispatch(loadPositions());
        dispatch(getPosition(id));
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(updatePositionError(resultError));
      });
  };
};

export const updatePositionStart = () => {
  return {
    type: "UPDATE_POSITION_START",
  };
};

export const updatePositionSuccess = (resultPosition) => {
  return {
    type: "UPDATE_POSITION_SUCCESS",
    resultPosition: resultPosition,
  };
};

export const updatePositionError = (error) => {
  return {
    type: "UPDATE_POSITION_ERROR",
    error: error,
  };
};

export const getCountPosition = () => {
  return function (dispatch) {
    dispatch(getCountPositionStart());

    axios
      .get(`position/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountPositionSuccess(result));
      })
      .catch((error) => {
        const resError = errorMessage(error);
        dispatch(getCountPositionError(resError));
      });
  };
};

export const getCountPositionStart = () => {
  return {
    type: "GET_COUNT_POSITION_START",
  };
};

export const getCountPositionSuccess = (result) => {
  return {
    type: "GET_COUNT_POSITION_SUCCESS",
    orderCount: result,
  };
};

export const getCountPositionError = (error) => {
  return {
    type: "GET_COUNT_POSITION_ERROR",
    error,
  };
};
