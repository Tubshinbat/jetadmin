import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { requiredCheck, minLength, maxLength } from "../../lib/inputRegex";
import { toastControl } from "../../lib/toasControl";

// ACTIONS
import { deleteNewsCategory } from "../../redux/actions/newsCategoryActions";

const Delete = (props) => {
  const deleteClick = () => {
    props.selectCategory.category._id &&
      props.delete(props.selectCategory.category._id);
    props.handleToggle();
  };

  return (
    <div>
      <p>
        Та <strong> {props.selectCategory.category.name} </strong> ангиллыг
        устгахдаа итгэлтэй байна уу?
      </p>

      <div className={`modelBtnGroup`}>
        <button
          className="btn modelBtn btn-danger btn-sm"
          onClick={deleteClick}
        >
          Устгах
        </button>
        <button
          className="btn modelBtn btn-light btn-sm"
          onClick={props.handleToggle}
        >
          Болих
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectCategory: state.newsCategoryReducer.selectData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    delete: (id) => dispatch(deleteNewsCategory(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
