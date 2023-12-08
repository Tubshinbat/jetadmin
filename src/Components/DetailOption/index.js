import React, { useEffect, useState } from "react";
import Button from "../General/Button";
import Model from "../General/Model";
import ModelFooter from "../General/Model/ModelFooter";
import * as actions from "../../redux/actions/optionsLocalActions";
import { connect } from "react-redux";
import css from "./__.module.css";
import { allRemoveDetail } from "../../redux/actions/detailOptionActions";

function DetailOption(props) {
  const [model, setModel] = useState(false);
  const [optionText, setOptionText] = useState("");
  const [optionList, setOptionList] = useState([]);

  const close = () => {
    setModel(false);
    setOptionList([]);
  };

  useEffect(() => {}, []);

  const show = () => {
    setModel(true);
    setOptionList(props.el.data);
  };

  const changeHandle = (e) => {
    setOptionText(e.target.value);
  };

  const addOption = () => {
    props.allRemoveDetail();
    const opt = optionList;
    opt.push(optionText);
    setOptionList((bf) => [...opt]);
    setOptionText("");
  };

  const deleteItem = (index) => {
    props.allRemoveDetail();
    let op = optionList;
    op.splice(index, 1);
    setOptionList((bf) => [...op]);
  };

  const handleAdd = (key) => {
    props.allRemoveDetail();
    let opt = props.options[key];
    opt.data = [...optionList];
    props.updateOptions([opt], key);
  };

  return (
    <div>
      <span className={css.OptionTitle}>
        {props.el.name} <i className="far fa-edit" onClick={show}></i>
        <i
          className="far fa-trash-alt"
          style={{ color: "red" }}
          onClick={() => props.deleteOption(props.k)}
        ></i>
      </span>
      <div className={css.ItemsOption}>
        {props.el.data &&
          props.el.data.map((element, index) => (
            <div key={index + "_" + element} className={css.ItemOption}>
              {element}
            </div>
          ))}
      </div>

      <Model CloseModel={close} modelName={props.el.name} show={model}>
        <div className={css.OptionItems}>
          {optionList &&
            optionList.map((el, index) => (
              <li key={el + "_" + index} className={css.Item}>
                <span> {el} </span>
                <i
                  className="far fa-trash-alt"
                  onClick={() => deleteItem(index)}
                ></i>
              </li>
            ))}
        </div>
        <div className={css.OptionModelForm}>
          <input
            className={`form-control`}
            type="text"
            placeholder="Утга нэмэх..."
            value={optionText}
            onChange={changeHandle}
          />
          <Button
            btnClass={`btn-success ${!optionText && "disabled"} `}
            text="Нэмэх"
            clickHandle={optionText ? addOption : null}
          />
        </div>
        <ModelFooter>
          <Button btnClass="btn-default" text="Буцах" clickHandle={close} />
          <Button
            text="Хадгалах"
            btnClass="btn-primary"
            clickHandle={() => handleAdd(props.k)}
          />
        </ModelFooter>
      </Model>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    options: state.optionsLocalReducer.options,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveOptions: (data) => dispatch(actions.saveOptions(data)),
    updateOptions: (data, key) => dispatch(actions.updateOptions(data)),
    allRemoveDetail: () => dispatch(allRemoveDetail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailOption);
