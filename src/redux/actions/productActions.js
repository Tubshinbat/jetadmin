import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_PRODUCT",
  };
};

// SAVE PRODUCT
export const saveProductInit = () => {
  return {
    type: "SAVE_PRODUCT_INIT",
  };
};

export const saveProduct = (product) => {
  return function(dispatch, getState) {
    dispatch(saveProductStart());
    axios
      .post(`product`, product)
      .then((response) => {
        const result = response.data;
        dispatch(saveProductSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };

        dispatch(saveProductError(err.message));
      });
  };
};

export const saveProductStart = () => {
  return {
    type: "SAVE_PRODUCT_START",
  };
};

export const saveProductSuccess = (result) => {
  return {
    type: "SAVE_PRODUCT_SUCCESS",
    product: result,
  };
};

export const saveProductError = (error) => {
  return {
    type: "SAVE_PRODUCT_ERROR",
    error,
  };
};



// LOAD PRODUCT

export const loadProduct = (query = "") => {
  return function(dispatch, getState) {
    dispatch(loadProductStart());
    axios
      .get("product?" + query)
      .then((response) => {
        const loadProduct = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadProductSuccess(loadProduct));
        dispatch(loadPagination(pagination));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(loadProductError(error.response.data.error.message));
        } else {
          dispatch(loadProductError(error.message));
        }
      });
  };
};

export const loadProductStart = () => {
  return {
    type: "LOAD_PRODUCT_START",
  };
};

export const loadProductSuccess = (loadProduct, pagination) => {
  return {
    type: "LOAD_PRODUCT_SUCCESS",
    loadProduct,
    pagination,
  };
};

export const loadProductError = (error) => {
  return {
    type: "LOAD_PRODUCT_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultProduct = (ids) => {
  return function(dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("product/delete", { params: { id: ids } })
      .then((response) => {
        const deleteProduct = response.data.data;
        dispatch(deleteProductSuccess(deleteProduct));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(deleteProductError(error.response.data.error.message));
        } else {
          dispatch(deleteProductError(error.message));
        }
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_PRODUCT_START",
  };
};

export const deleteProductSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_PRODUCT_SUCCESS",
    deleteProduct: deleteData,
  };
};

export const deleteProductError = (error) => {
  return {
    type: "DELETE_MULT_PRODUCT_ERROR",
    error,
  };
};

// GET PRODUCT

export const getInit = () => {
  return {
    type: "GET_PRODUCT_INIT",
  };
};

export const getProduct = (id) => {
  return function(dispatch, getState) {
    dispatch(getProductStart());
    axios
      .get("product/" + id)
      .then((response) => {
        const product = response.data.data;
        dispatch(getProductSuccess(product));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(getProductError(error.response.data.error.message));
        } else {
          dispatch(getProductError(error.message));
        }
      });
  };
};

export const getProductStart = () => {
  return {
    type: "GET_PRODUCT_START",
  };
};

export const getProductSuccess = (product) => {
  return {
    type: "GET_PRODUCT_SUCCESS",
    singleProduct: product,
  };
};

export const getProductError = (error) => {
  return {
    type: "GET_PRODUCT_ERROR",
    error,
  };
};

//UPDATE PRODUCT

export const updateProduct = (id, data) => {
  return function(dispatch) {
    dispatch(updateProductStart());
    axios
      .put(`product/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateProductSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        // if (error.response.status) {
        //   dispatch(updateProductError(error.response.data.error.message));
        // } else {
        dispatch(updateProductError(err.message));
        // }
      });
  };
};

export const updateProductStart = () => {
  return {
    type: "UPDATE_PRODUCT_START",
  };
};

export const updateProductSuccess = (result) => {
  return {
    type: "UPDATE_PRODUCT_SUCCESS",
    updateProduct: result,
  };
};

export const updateProductError = (error) => {
  return {
    type: "UPDATE_PRODUCT_ERROR",
    error,
  };
};

export const getCountProduct = () => {
  return function(dispatch) {
    dispatch(getCountProductStart());

    axios
      .get(`product/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountProductSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(getCountProductError(error));
      });
  };
};

export const getCountProductStart = () => {
  return {
    type: "GET_COUNT_PRODUCT_START",
  };
};

export const getCountProductSuccess = (result) => {
  return {
    type: "GET_COUNT_PRODUCT_SUCCESS",
    orderCount: result,
  };
};

export const getCountProductError = (error) => {
  return {
    type: "GET_COUNT_PRODUCT_ERROR",
    error,
  };
};
