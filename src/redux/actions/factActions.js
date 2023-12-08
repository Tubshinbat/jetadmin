import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_FACT",
  };
};

// SAVE FACT

export const saveFact = (fact) => {
  return function (dispatch) {
    dispatch(saveFactStart());
    axios
      .post(`facts`, fact)
      .then((response) => {
        const result = response.data.data;
        dispatch(saveFactSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(saveFactError(error.message));
      });
  };
};

export const saveFactStart = () => {
  return {
    type: "SAVE_FACT_START",
  };
};

export const saveFactSuccess = (result) => {
  return {
    type: "SAVE_FACT_SUCCESS",
    fact: result,
  };
};

export const saveFactError = (error) => {
  return {
    type: "SAVE_FACT_ERROR",
    error,
  };
};

// LOAD FACT

export const loadFacts = (query = "") => {
  return function (dispatch) {
    dispatch(loadFactsStart());
    axios
      .get("facts?" + query)
      .then((response) => {
        const loadFact = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadFactsSuccess(loadFact, pagination));
        dispatch(loadPagination(pagination));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(loadFactsError(error.message));
      });
  };
};

export const loadFactsStart = () => {
  return {
    type: "LOAD_FACTS_START",
  };
};

export const loadFactsSuccess = (facts, pagination) => {
  return {
    type: "LOAD_FACTS_SUCCESS",
    facts,
    pagination,
  };
};

export const loadFactsError = (error) => {
  return {
    type: "LOAD_FACTS_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultFact = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("facts/delete", { params: { id: ids } })
      .then((response) => {
        const deleteFact = response.data.data;
        dispatch(deleteFactSuccess(deleteFact));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(deleteFactError(error.response.data.error.message));
        } else {
          dispatch(deleteFactError(error.message));
        }
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_FACT_START",
  };
};

export const deleteFactSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_FACT_SUCCESS",
    deleteFact: deleteData,
  };
};

export const deleteFactError = (error) => {
  return {
    type: "DELETE_MULT_FACT_ERROR",
    error,
  };
};

// GET FACT

export const getFact = (id) => {
  return function (dispatch, getState) {
    dispatch(getFactStart());
    axios
      .get("facts/" + id)
      .then((response) => {
        const fact = response.data.data;
        dispatch(getFactSuccess(fact));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(getFactError(error.message));
      });
  };
};

export const getFactStart = () => {
  return {
    type: "GET_FACT_START",
  };
};

export const getFactSuccess = (fact) => {
  return {
    type: "GET_FACT_SUCCESS",
    fact,
  };
};

export const getFactError = (error) => {
  return {
    type: "GET_FACT_ERROR",
    error,
  };
};

//UPDATE FACT

export const updateFact = (id, data) => {
  return function (dispatch) {
    dispatch(updateFactStart());
    axios
      .put(`facts/${id}`, data)
      .then((response) => {
        const result = response.data.data;
        dispatch(updateFactSuccess(result));
      })
      .catch((err) => {
        dispatch(updateFactError(err.message));
      });
  };
};

export const updateFactStart = () => {
  return {
    type: "UPDATE_FACT_START",
  };
};

export const updateFactSuccess = (result) => {
  return {
    type: "UPDATE_FACT_SUCCESS",
    updateFact: result,
  };
};

export const updateFactError = (error) => {
  return {
    type: "UPDATE_FACT_ERROR",
    error,
  };
};
