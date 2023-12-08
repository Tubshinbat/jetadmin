import axios from "../../axios-base";

// SAVE NEWS
export const clear = () => {
  return {
    type: "CLEAR_INIT_STATISTICS",
  };
};

export const saveStatistics = (data) => {
  return function (dispatch) {
    dispatch(saveStatisticsStart());

    axios
      .post(`statistics`, data)
      .then((response) => {
        const result = response.data.data;
        dispatch(saveStatisticsSuccess(result));
      })
      .catch((error) => {
        dispatch(saveStatisticsError(error.message));
      });
  };
};

export const saveStatisticsStart = () => {
  return {
    type: "SAVE_STATISTICS_START",
  };
};

export const saveStatisticsSuccess = (result) => {
  return {
    type: "SAVE_STATISTICS_SUCCESS",
    statistic: result,
  };
};

export const saveStatisticsError = (error) => {
  return {
    type: "SAVE_STATISTICS_ERROR",
    error,
  };
};

// LOAD NEWS

export const loadStatistics = (query) => {
  return function (dispatch, getState) {
    dispatch(loadStatisticsStart());
    axios
      .get("statistics?" + query)
      .then((response) => {
        const result = response.data.data;
        dispatch(loadStatisticsSuccess(result));
      })
      .catch((error) => {
        dispatch(loadStatisticsError(error.message));
      });
  };
};

export const loadStatisticsStart = () => {
  return {
    type: "LOAD_STATISTICS_START",
  };
};

export const loadStatisticsSuccess = (res) => {
  return {
    type: "LOAD_STATISTICS_SUCCESS",
    statistics: res,
  };
};

export const loadStatisticsError = (error) => {
  return {
    type: "LOAD_STATISTICS_ERROR",
    error,
  };
};

// GET ACTIVE

export const getActiveStatistic = () => {
  return function (dispatch) {
    dispatch(getActiveStatisticStart());
    axios
      .get("statistics/active")
      .then((res) => {
        const statistic = res.data.data;
        dispatch(getActiveStatisticSuccess(statistic));
      })
      .catch((error) => {
        dispatch(getActiveStatisticError(error));
      });
  };
};

export const getActiveStatisticStart = () => {
  return {
    type: "GET_ACTIVE_STATISTIC_START",
  };
};

export const getActiveStatisticError = (error) => {
  return {
    type: "GET_ACTIVE_STATISTIC_ERROR",
    error,
  };
};

export const getActiveStatisticSuccess = (data) => {
  return {
    type: "GET_ACTIVE_STATISTIC_SUCCESS",
    activeStatistic: data,
  };
};

// GET NEWS

export const getStatistic = (id) => {
  return function (dispatch, getState) {
    dispatch(getStatisticStart());
    axios
      .get("statistics/" + id)
      .then((response) => {
        const statistic = response.data.data;
        dispatch(getStatisticSuccess(statistic));
      })
      .catch((error) => {
        dispatch(getStatisticError(error.message));
      });
  };
};

export const getStatisticStart = () => {
  return {
    type: "GET_STATISTIC_START",
  };
};

export const getStatisticSuccess = (statistic) => {
  return {
    type: "GET_STATISTIC_SUCCESS",
    statistic,
  };
};

export const getStatisticError = (error) => {
  return {
    type: "GET_STATISTIC_ERROR",
    error,
  };
};

//UPDATE NEWS

export const updateStatistics = (id, data) => {
  return function (dispatch) {
    dispatch(updateStatisticsStart());
    axios
      .put(`statistics/${id}`, data)
      .then((response) => {
        const result = response.data.data;
        dispatch(updateStatisticsSuccess(result));
      })
      .catch((error) => {
        dispatch(updateStatisticsError(error.message));
      });
  };
};

export const updateStatisticsStart = () => {
  return {
    type: "UPDATE_STATISTICS_START",
  };
};

export const updateStatisticsSuccess = (result) => {
  return {
    type: "UPDATE_STATISTICS_SUCCESS",
  };
};

export const updateStatisticsError = (error) => {
  return {
    type: "UPDATE_STATISTICS_ERROR",
    error,
  };
};

export const deleteStatistic = (id) => {
  return function (dispatch) {
    dispatch(deleteStatisticStart());

    axios
      .delete(`statistics/${id}`)
      .then((response) => {
        dispatch(deleteStatisticSuccess());
      })
      .catch((error) => {
        dispatch(deleteStatisticError(error.message));
      });
  };
};

export const deleteStatisticStart = () => {
  return {
    type: "DELETE_STATISTIC_START",
  };
};

export const deleteStatisticSuccess = () => {
  return {
    type: "DELETE_STATISTIC_SUCCESS",
  };
};

export const deleteStatisticError = (error) => {
  return {
    type: "DELETE_STATISTIC_ERROR",
    error,
  };
};
