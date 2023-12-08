import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";

// ACTIONS
import { deletePosition } from "../../redux/actions/positionActions";

const Delete = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);

  const deleteClick = () => {
    props.position._id && props.delete(props.position._id);
    props.handleToggle();
  };

  return (
    <div>
      <p>
        Та{" "}
        <strong>
          {" "}
          {props.position && props.position[cookies.language] !== undefined
            ? props.position[cookies.language].name
            : "Сонгосон"}{" "}
        </strong>{" "}
        хэлтэсийг устгахдаа итгэлтэй байна уу?
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
    position: state.positionReducer.position,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    delete: (id) => dispatch(deletePosition(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
