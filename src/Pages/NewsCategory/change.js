import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";

import { requiredCheck, minLength, maxLength } from "../../lib/inputRegex";
import { toastControl } from "../../lib/toasControl";

// ACTIONS
import { updateNewsCategory } from "../../redux/actions/newsCategoryActions";

const Change = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({
    name: false,
  });

  // USEEFFECT
  useEffect(() => {
    setFormData({});
  }, []);

  useEffect(() => {
    if (props.selectCategory.category) {
      const data = props.selectCategory.category;

      const { eng, mn, status } = data;
      setFormData(() => ({ name: "" }));

      if (eng !== undefined && cookies.language === "eng")
        setFormData((bf) => ({ name: eng.name, status }));

      if (mn !== undefined && cookies.language === "mn")
        setFormData((bf) => ({ name: mn.name, status }));
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
  };
  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData((bf) => ({ ...bf, [name]: value }));
    checkFrom(event.target.name, event.target.value);
  };

  // CLICK FUNCTIONS

  const addClick = () => {
    props.handleToggle();
    console.log(props.selectCategory);
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
        <input
          name="name"
          className="form-control"
          type="text"
          value={formData.name}
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
    loading: state.newsCategoryReducer.loading,
    selectCategory: state.newsCategoryReducer.selectData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    update: (data, id) => dispatch(updateNewsCategory(data, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Change);
