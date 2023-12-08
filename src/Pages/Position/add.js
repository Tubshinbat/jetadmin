import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import DropImage from "../../Components/SingleDrop";
import { requiredCheck, minLength, maxLength } from "../../lib/inputRegex";
import { toastControl } from "../../lib/toasControl";
import { allRemove, tinymceAddPhoto } from "../../redux/actions/imageActions";

// ACTIONS
import { savePosition } from "../../redux/actions/positionActions";

const Add = (props) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({
    name: false,
  });
  const [IS_Direct, setIsDrirect] = useState(false);

  // USEEFFECT
  useEffect(() => {
    setFormData({ name: "" });
  }, []);

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

    return sendData;
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
    if (event.target.name === "isDirect") setIsDrirect(event.target.checked);
  };
  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData((bf) => ({ ...bf, [name]: value }));
    checkFrom(event.target.name, event.target.value);
  };

  // CLICK FUNCTIONS

  const addClick = () => {
    props.handleToggle();
    props.removePhotos();
    if (allCheck()) {
      const sendData = convertFromdata(formData);
      props.save(sendData);
      setFormData({ name: "" });
    } else {
      toastControl(
        "error",
        "Заавал бөглөх талбар бөглөнө үү дахин оролдоно уу"
      );
    }
  };

  useEffect(() => {
    setFormData({ name: "" });
    props.removePhotos();
  }, []);

  useEffect(() => {
    setFormData((bf) => ({ ...bf, picture: props.picture }));
    if (props.banner !== null) checkFrom("picture", props.picture);
  }, [props.picture]);

  return (
    <>
      <div className="form-group">
        <input
          name="name"
          className="form-control"
          type="text"
          value={formData.name || ""}
          placeholder="Хэлтэс: Тэнхэм, тасаг, нэгж"
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
    picture: state.imageReducer.banner,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    save: (data) => dispatch(savePosition(data)),
    removePhotos: () => dispatch(allRemove()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
