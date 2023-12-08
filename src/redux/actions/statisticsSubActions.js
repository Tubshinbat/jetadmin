import axios from "../../axios-base";

// SAVE NEWS
export const clear = () => {
  return {
    type: "CLEAR_INIT_STATISTIC_SUB",
  };
};

export const saveStatisticsSub = (data) => {
  return function (dispatch) {
    dispatch(saveStatisticsSubStart());

    axios
      .post(`statisticssub`, data)
      .then((response) => {
        const result = response.data.data;
        dispatch(saveStatisticsSubSuccess(result));
      })
      .catch((error) => {
        dispatch(saveStatisticsSubError(error.message));
      });
  };
};

export const saveStatisticsSubStart = () => {
  return {
    type: "SAVE_STATISTIC_SUB_START",
  };
};

export const saveStatisticsSubSuccess = (result) => {
  return {
    type: "SAVE_STATISTIC_SUB_SUCCESS",
    statistic: result,
  };
};

export const saveStatisticsSubError = (error) => {
  return {
    type: "SAVE_STATISTIC_SUB_ERROR",
    error,
  };
};

// LOAD NEWS

export const loadStatisticsSub = (query) => {
  return function (dispatch, getState) {
    dispatch(loadStatisticsSubStart());
    axios
      .get("statisticssub?" + query)
      .then((response) => {
        const result = response.data.data;
        dispatch(loadStatisticsSubSuccess(result));
      })
      .catch((error) => {
        dispatch(loadStatisticsSubError(error.message));
      });
  };
};

export const loadStatisticsSubStart = () => {
  return {
    type: "LOAD_STATISTICS_SUB_START",
  };
};

export const loadStatisticsSubSuccess = (res) => {
  return {
    type: "LOAD_STATISTICS_SUB_SUCCESS",
    statisticsSub: res,
  };
};

export const loadStatisticsSubError = (error) => {
  return {
    type: "LOAD_STATISTICS_SUB_ERROR",
    error,
  };
};

// GET NEWS

export const getStatisticSub = (id, main) => {
  return function (dispatch, getState) {
    dispatch(getStatisticSubStart());
    axios
      .get("statisticssub/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getStatisticSubSuccess(result));
      })
      .catch((error) => {
        dispatch(getStatisticSubError(error.message));
      });
  };
};

export const getStatisticSubStart = () => {
  return {
    type: "GET_STATISTIC_SUB_START",
  };
};

export const getStatisticSubSuccess = (statisticSub) => {
  return {
    type: "GET_STATISTIC_SUB_SUCCESS",
    statisticSub,
  };
};

export const getStatisticSubError = (error) => {
  return {
    type: "GET_STATISTIC_SUB_ERROR",
    error,
  };
};

//UPDATE NEWS

export const updateStatisticSub = (id, data) => {
  return function (dispatch) {
    dispatch(updateStatisticSubStart());
    axios
      .put(`statisticssub/${id}`, data)
      .then((response) => {
        const result = response.data.data;
        dispatch(updateStatisticSubSuccess(result));
      })
      .catch((error) => {
        dispatch(updateStatisticSubError(error.message));
      });
  };
};

export const updateStatisticSubStart = () => {
  return {
    type: "UPDATE_STATISTICS_SUB_START",
  };
};

export const updateStatisticSubSuccess = (result) => {
  return {
    type: "UPDATE_STATISTICS_SUB_SUCCESS",
  };
};

export const updateStatisticSubError = (error) => {
  return {
    type: "UPDATE_STATISTICS_SUB_ERROR",
    error,
  };
};

export const deleteStatisticSub = (id) => {
  return function (dispatch) {
    dispatch(deleteStatisticSubStart());

    axios
      .delete(`statisticssub/${id}`)
      .then((response) => {
        dispatch(deleteStatisticSubSuccess());
      })
      .catch((error) => {
        dispatch(deleteStatisticSubError(error.message));
      });
  };
};

export const deleteStatisticSubStart = () => {
  return {
    type: "DELETE_STATISTIC_SUB_START",
  };
};

export const deleteStatisticSubSuccess = () => {
  return {
    type: "DELETE_STATISTIC_SUB_SUCCESS",
  };
};

export const deleteStatisticSubError = (error) => {
  return {
    type: "DELETE_STATISTIC_SUB_ERROR",
    error,
  };
};
