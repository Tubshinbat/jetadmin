import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";

import { requiredCheck, minLength, maxLength } from "../../lib/inputRegex";
import { toastControl } from "../../lib/toasControl";

// ACTIONS
import { updateMenu } from "../../redux/actions/FooterMenuActions";

const Change = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({
    name: false,
  });
  const [IS_Direct, setIsDrirect] = useState(false);
  const [is_model, setIsModel] = useState(false);

  // USEEFFECT
  useEffect(() => {
    setFormData({});
  }, []);

  useEffect(() => {
    if (props.selectCategory.category) {
      const { isDirect, isModel } = props.selectCategory.category;
      setIsDrirect(isDirect);
      setIsModel(isModel);
      setFormData((bf) => ({
        ...props.selectCategory.category,
        ...props.selectCategory.category[cookies.language],
      }));
    }
  }, [props.selectCategory]);

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
    if (event.target.name === "isDirect") {
      setIsDrirect(event.target.checked);
      setFormData((bf) => ({
        ...bf,
        isDirect: event.target.checked,
        model: null,
        isModel: false,
      }));
      setIsModel(false);
    }
    if (event.target.name === "isModel") {
      setIsModel(event.target.checked);
      setFormData((bf) => ({
        ...bf,
        isModel: event.target.checked,
        direct: null,
        isDirect: false,
      }));
      setIsDrirect(false);
    }
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData((bf) => ({ ...bf, [name]: value }));
    checkFrom(event.target.name, event.target.value);
  };

  // CLICK FUNCTIONS

  const addClick = () => {
    props.handleToggle();
    if (allCheck()) {
      const id = props.selectCategory.category._id;
      props.update(formData, id);
      setFormData({});
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
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="isDirect"
            name="isDirect"
            checked={IS_Direct || false}
            onChange={handleRadio}
          />
          <label className="custom-control-label" htmlFor="isDirect">
            Линк холбох
          </label>
        </div>
      </div>
      <div className="form-group">
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="modelx"
            name="isModel"
            checked={is_model || false}
            onChange={handleRadio}
          />
          <label className="custom-control-label" htmlFor="modelx">
            Модел холбох
          </label>
        </div>
      </div>
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
      <div
        className="form-group"
        style={{ display: IS_Direct ? "block" : "none" }}
      >
        <input
          name="direct"
          className="form-control"
          type="text"
          value={formData.direct || ""}
          placeholder="Холбох линкээ оруулна уу"
          onChange={handleChange}
        />
      </div>

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
    loading: state.footerMenuReducer.loading,
    selectCategory: state.footerMenuReducer.selectData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    update: (data, id) => dispatch(updateMenu(data, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Change);
