import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";

import DropImage from "../../Components/SingleDrop";
import { requiredCheck, minLength, maxLength } from "../../lib/inputRegex";
import { toastControl } from "../../lib/toasControl";

import css from "./__.module.css";

// ACTIONS
import { updatePosition } from "../../redux/actions/positionActions";
import { allRemove, tinymceAddPhoto } from "../../redux/actions/imageActions";
import base from "../../base";

const Change = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({
    name: false,
  });
  const [picture, setPicture] = useState("");
  // USEEFFECT
  useEffect(() => {
    setFormData({ name: "" });
    props.removePhotos();
  }, []);

  useEffect(() => {
    setFormData((bf) => ({ ...bf, picture: props.picture }));
    if (props.picture !== null) checkFrom("picture", props.picture);
  }, [props.picture]);

  useEffect(() => {
    if (props.position) {
      const data = props.position;
      const { eng, mn, status } = data;
      setFormData(() => ({ name: "" }));

      if (eng !== undefined && cookies.language === "eng")
        setFormData((bf) => ({ name: eng.name, status }));

      if (mn !== undefined && cookies.language === "mn")
        setFormData((bf) => ({ name: mn.name, status }));

      if (props.position.picture) {
        setPicture(props.position.picture);
      } else {
        setPicture(() => "");
      }
    }
  }, [props.position, cookies.language]);

  // CHECK
  const checkName = (el, name) => {
    return name === el;
  };
  const checkFrom = (name, val) => {
    // Шалгах формуудаа энд тодорхойлоно
    const valueErrors = Object.keys(errors);
    if (valueErrors.find((el) => checkName(el, name))) {
      let result = requiredCheck(val);
      if (name === "name" && result === true) {
        result = minLength(val, 2);
        result === true && (result = maxLength(val, 50));
      }
      setErrors((bfError) => ({ ...bfError, [name]: result }));
    }
  };

  const checkTrue = () => {
    let errorCount = 0;
    let errorsValues = Object.values(errors);
    errorsValues.map((el) => {
      el === true && errorCount++;
    });
    return errorsValues.length === errorCount;
  };

  const allCheck = () => {
    Object.keys(errors).map((el) => {
      checkFrom(el, formData[el] === undefined ? "" : formData[el]);
    });
    return checkTrue();
  };

  const handleRadio = (event) => {
    setFormData((bf) => ({ ...bf, [event.target.name]: event.target.checked }));
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData((bf) => ({ ...bf, [name]: value }));
    checkFrom(event.target.name, event.target.value);
  };

  // CLICK FUNCTIONS

  const deletePicture = () => {
    setFormData((bf) => {
      delete bf["picture"];
      return { ...bf };
    });
    setPicture(() => "");
  };

  const convertFromdata = () => {
    const sendData = new FormData();
    Object.keys(formData).map((index) => {
      if (index === "picture") {
        if (formData[index])
          for (let i = 0; i < formData[index].length; i++) {
            sendData.append([index], formData[index][i]);
          }
      } else sendData.append(index, formData[index]);
    });

    sendData.append("oldPicture", picture);

    return sendData;
  };

  const addClick = () => {
    props.handleToggle();
    if (allCheck()) {
      const id = props.position._id;
      const sendData = convertFromdata();
      props.removePhotos();
      props.update(id, sendData);
      setFormData({ name: "" });
    } else {
      toastControl(
        "error",
        "Заавал бөглөх талбар бөглөнө үү дахин оролдоно уу"
      );
    }
  };

  return (
    <>
      <div className="form-group">
        <input
          name="name"
          className="form-control"
          type="text"
          value={formData.name || ""}
          placeholder="Ангилалын нэр жнь: Podcast, Танд хэрэгтэй"
          onChange={handleChange}
        />
      </div>
      {errors.name && <span className={`litleError`}>{errors.name}</span>}

      <div className={`modelBtnGroup`}>
        <button className="btn modelBtn btn-success btn-sm" onClick={addClick}>
          Хадгалах
        </button>
        <button
          className="btn modelBtn btn-light btn-sm"
          onClick={props.handleToggle}
        >
          Болих
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.positionReducer.loading,
    position: state.positionReducer.position,
    picture: state.imageReducer.banner,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    update: (id, data) => dispatch(updatePosition(id, data)),
    removePhotos: () => dispatch(allRemove()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Change);
