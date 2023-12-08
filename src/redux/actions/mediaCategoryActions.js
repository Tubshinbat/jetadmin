import axios from "../../axios-base";

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

export const clear = () => {
  return function (dispatch, getState) {
    dispatch(clearStart());
    dispatch(loadMediaCategories());
  };
};

export const clearStart = () => {
  return {
    type: "CLEAR_MEDIACATEGORIES",
  };
};

export const loadMediaCategories = () => {
  return function (dispatch, getState) {
    dispatch(loadMediaCategoriesStart());
    axios
      .get("media-categories")
      .then((response) => {
        const result = response.data.data;
        dispatch(loadMediaCategoriesSuccess(result));
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(loadMediaCategoriesError(resultError));
      });
  };
};
export const loadMediaCategoriesStart = () => {
  return {
    type: "LOAD_MEDIA_CATEGORIES_START",
  };
};

export const loadMediaCategoriesSuccess = (result) => {
  return {
    type: "LOAD_MEDIA_CATEGORIES_SUCCESS",
    categories: result,
  };
};

export const loadMediaCategoriesError = (error) => {
  return {
    type: "LOAD_MEDIA_CATEGORIES_ERROR",
    error,
  };
};

// SINGLE CATEGORY

export const loadMediaCategory = (mediaCategoryId) => {
  return function (dispatch, getState) {
    dispatch(loadMediaCategoryStart());
    axios
      .get(`media-categories/${mediaCategoryId}`)
      .then((response) => {
        const loadedMediaCategory = response.data.data;
        dispatch(loadMediaCategorySuccess(loadedMediaCategory));
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(loadMediaCategoryError(resultError));
      });
  };
};

export const loadMediaCategoryStart = () => {
  return {
    type: "LOAD_MEDIA_CATEGORY_START",
  };
};

export const loadMediaCategorySuccess = (result) => {
  return {
    type: "LOAD_MEDIA_CATEGORY_SUCCESS",
    category: result,
  };
};

export const loadMediaCategoryError = (error) => {
  return {
    type: "LOAD_MEDIA_CATEGORY_ERROR",
    error,
  };
};

// Change positions
export const changePosition = (data) => {
  return function (dispatch) {
    dispatch(changePositionStart());

    axios
      .post("media-categories/change", data)
      .then((response) => {
        const result = response.data.data;
        dispatch(changePositionSuccess(result));
        dispatch(loadMediaCategories());
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(changePositionError(resultError));
      });
  };
};

export const changePositionStart = (result) => {
  return {
    type: "MEDIACATEGORIES_CHANGE_POSITION_START",
  };
};

export const changePositionSuccess = (data) => {
  return {
    type: "MEDIACATEGORIES_CHANGE_POSITION_SUCCESS",
    menus: data,
  };
};

export const changePositionError = (error) => {
  return {
    type: "MEDIACATEGORIES_CHANGE_POSITION_ERROR",
    error: error,
  };
};

// DELETE CATEGORY

export const deleteMediaCategory = (categoryId, data) => {
  return function (dispatch, getState) {
    dispatch(deleteMediaCategoryStart());

    axios
      .delete(`media-categories/${categoryId}`, data)
      .then((response) => {
        const resultCategory = response.data.data;
        dispatch(deleteMediaCategorySuccess(resultCategory));
        dispatch(loadMediaCategories());
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(deleteMediaCategoryError(resultError));
      });
  };
};

export const deleteMediaCategoryStart = () => {
  return {
    type: "DELETE_MEDIA_CATEGORY_START",
  };
};

export const deleteMediaCategorySuccess = (result) => {
  return {
    type: "DELETE_MEDIA_CATEGORY_SUCCESS",
    dlMedia: result,
  };
};

export const deleteMediaCategoryError = (error) => {
  return {
    type: "DELETE_MEDIA_CATEGORY_ERROR",
    error,
  };
};

// SAVE CATEGORY

export const saveMediaCategory = (category) => {
  return function (dispatch, getState) {
    dispatch(saveMediaCategoryStart());
    let data = {
      name: category.name,
      status: category.status,
    };

    if (category.parentId !== null) {
      data = {
        name: category.name,
        parentId: category.parentId,
      };
    }

    data.language = category.language;
    data.status = category.status;

    axios
      .post(`media-categories`, data)
      .then((response) => {
        const resultCategory = response.data.data;
        dispatch(saveMediaCategorySuccess(resultCategory));
        dispatch(loadMediaCategories());
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(saveMediaCategoryError(resultError));
      });
  };
};

export const saveMediaCategoryStart = () => {
  return {
    type: "CREATE_MEDIA_CATEGORY_START",
  };
};

export const saveMediaCategorySuccess = (resultCategory) => {
  return {
    type: "CREATE_MEDIA_CATEGORY_SUCCESS",
    resultCategory: resultCategory,
  };
};

export const saveMediaCategoryError = (error) => {
  return {
    type: "CREATE_MEDIA_CATEGORY_ERROR",
    error: error,
  };
};

// UPDATE CATEGORY

export const updateMediaCategory = (category, id) => {
  return function (dispatch) {
    dispatch(updateMediaCategoryStart());
    const data = {
      name: category.name,
    };

    axios
      .put(`media-categories/${id}`, data)
      .then((response) => {
        const resultCategory = response.data.data;
        dispatch(updateMediaCategorySuccess(resultCategory));
        dispatch(loadMediaCategories());
        dispatch(loadMediaCategory(id));
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(updateMediaCategoryError(resultError));
      });
  };
};

export const updateMediaCategoryStart = () => {
  return {
    type: "UPDATE_MEDIA_CATEGORY_START",
  };
};

export const updateMediaCategorySuccess = (resultCategory) => {
  return {
    type: "UPDATE_MEDIA_CATEGORY_SUCCESS",
    resultCategory: resultCategory,
  };
};

export const updateMediaCategoryError = (error) => {
  return {
    type: "UPDATE_MEDIA_CATEGORY_ERROR",
    error: error,
  };
};
