import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import Model from "../General/Model";
import css from "./__.module.css";

//Actions
import * as actions from "../../redux/actions/socialLinkActions";

// Lib
import { requiredCheck } from "../../lib/inputRegex";
import { toastControl } from "../../lib/toasControl";
import Spinner from "../General/Spinner";

const SocialLinks = ({
  stateLinks,
  saveLink,
  deleteLink,
  editLink,
  resultError,
  loadLinks,
  success,
  loading,
}) => {
  // pageInit useEffect
  useEffect(() => {
    loadLinks();
  }, []);

  const [showModel, setShowModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [selectData, setSelectData] = useState("");
  const [inputData, setInputData] = useState({
    name: "",
    link: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    link: false,
  });

  const init = () => {
    setInputData({
      name: "",
      link: "",
    });
    setErrors({
      name: false,
      link: false,
    });
    setSelectData(null);
  };

  const checkTrue = () => {
    let errorsValues = Object.values(errors);
    let errorCount = 0;
    errorsValues.map((el) => {
      if (el === true) {
        errorCount++;
      }
    });
    return errorsValues.length === errorCount;
  };

  const checkForms = async (name, value) => {
    let result = requiredCheck(value);
    setErrors((bfError) => ({ ...bfError, [name]: result }));
  };

  const allCheckErros = () => {
    const inputKeys = Object.keys(inputData);
    inputKeys.map((el) => {
      checkForms(el, inputData[el]);
    });
    const result = checkTrue();
    return result;
  };

  const handleChange = (event) => {
    setInputData((bfData) => ({
      ...bfData,
      [event.target.name]: event.target.value,
    }));
    checkForms(event.target.name, event.target.value);
  };

  useEffect(() => {
    toastControl("error", resultError);
  }, [resultError]);

  useEffect(() => {
    toastControl("success", success);
  }, [success]);

  const handleSave = async () => {
    if (allCheckErros()) {
      saveLink(inputData);
      handleShowModel();
    } else {
      toastControl("error", "Уучлаарай хадгалах боломжгүй байна.");
    }
  };

  // Delete
  const deleteStateLink = () => {
    handleShowDeleteModel();
  };

  const handleDelete = (id) => {
    deleteLink(id);
    init();
    handleShowDeleteModel();
  };

  // edit

  const handleEdit = async () => {
    if (allCheckErros()) {
      editLink(selectData.id, inputData);
      handleShowEdit();
    } else {
      toastControl("error", "Алдаа гарлаа");
    }
  };

  // Models
  const handleShowModel = () => {
    showModel === true ? setShowModel(false) : setShowModel(true);
    init();
  };
  const handleClose = () => {
    setShowModel(false);
  };

  const handleShowDeleteModel = () => {
    deleteModel === true ? setDeleteModel(false) : setDeleteModel(true);
    init();
  };

  const handleCloseEdit = () => {
    setEditModel(false);
    init();
  };

  const handleDeleteClose = () => {
    setDeleteModel(false);
    init();
  };

  const handleShowEdit = () => {
    editModel === true ? setEditModel(false) : setEditModel(true);
  };

  return (
    <>
      <div className={css.HeaderLink}>
        <h4 className={`${css.subTitle}`}> СОШИАЛ ХАЯГУУД </h4>
        <button onClick={handleShowModel} className={`${css.btnRadius} `}>
          <i className="fas fa-plus-circle"></i>
        </button>
      </div>
      {loading ? <Spinner /> : null}
      <div className={css.SocialList}>
        {stateLinks &&
          stateLinks.map((el, index) => (
            <div className={css.SocialLink}>
              <a href={el.link} target="_blank">
                {el.name}
              </a>
              <div className={css.ControlLink}>
                <button
                  className="btn"
                  onClick={() => {
                    handleShowEdit();
                    setInputData({ name: el.name, link: el.link });
                    setErrors({ name: true, link: true });
                    setSelectData({ name: el.name, link: el.link, id: el._id });
                  }}
                >
                  <i className="fas fa-pen-alt"></i>
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    deleteStateLink();
                    setSelectData({ name: el.name, index: index, id: el._id });
                  }}
                >
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          ))}
      </div>

      <Model
        modelName="Та устгахдаа итгэлтэй байна уу"
        show={deleteModel}
        handleToggle={handleDeleteClose}
      >
        <div className={css.ModelBody}>
          Та <b> {selectData && selectData.name} </b>- сошиал хаягыг устгахдаа
          итгэлтэй байна уу?
        </div>
        <div className={css.BtnGroup}>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(selectData && selectData.id)}
          >
            Устгах
          </button>
          <button className="btn btn-light btn-sm" onClick={handleDeleteClose}>
            Болих
          </button>
        </div>
      </Model>
      <Model
        modelName="Сошиал хаяг засварлах"
        show={editModel}
        handleToggle={handleCloseEdit}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label className={css.Label}>
                Сошиал суваг{" "}
                <span> / Facebook, Twitter, instagram.com ... /</span>
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={handleChange}
                placeholder="Сайтын сувгийн нэрийг оруулна уу"
                value={inputData.name}
              ></input>
              <span className={css.Error}>
                {errors.name === false || errors.name}
              </span>
            </div>
            <div className="form-group">
              <label className={css.Label}> Сошиал сувгийн холбоос </label>
              <input
                type="text"
                name="link"
                className="form-control"
                onChange={handleChange}
                placeholder="Сошиал сувгийн холбоосыг оруулна уу"
                value={inputData.link}
              ></input>
              <span className={css.Error}>
                {errors.link === false || errors.link}
              </span>
            </div>
            <div className={css.BtnGroup}>
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleEdit()}
              >
                Өөрчлөх
              </button>
              <button
                className="btn btn-light btn-sm"
                onClick={handleCloseEdit}
              >
                Болих
              </button>
            </div>
          </div>
        </div>
      </Model>
      <Model
        modelName="Сошиал хаяг нэмэх"
        show={showModel}
        handleToggle={handleClose}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label className={css.Label}>
                Сошиал суваг{" "}
                <span> / Facebook, Twitter, instagram.com ... /</span>
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={handleChange}
                placeholder="Сайтын сувгийн нэрийг оруулна уу"
                value={inputData.name}
              ></input>
              <span className={css.Error}>
                {errors.name === false || errors.name}
              </span>
            </div>
            <div className="form-group">
              <label className={css.Label}> Сошиал сувгийн холбоос </label>
              <input
                type="text"
                name="link"
                className="form-control"
                onChange={handleChange}
                placeholder="Сошиал сувгийн холбоосыг оруулна уу"
                value={inputData.link}
              ></input>
              <span className={css.Error}>
                {errors.link === false || errors.link}
              </span>
            </div>
            <div className={css.BtnGroup}>
              <button className="btn btn-success btn-sm" onClick={handleSave}>
                Хадгалах
              </button>
              <button className="btn btn-light btn-sm" onClick={handleClose}>
                Болих
              </button>
            </div>
          </div>
        </div>
      </Model>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    stateLinks: state.socialLinkReducer.stateData,
    getData: state.socialLinkReducer.getData,
    loading: state.socialLinkReducer.loading,
    resultError: state.socialLinkReducer.error,
    success: state.socialLinkReducer.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveLink: (linkData) => dispatch(actions.createLink(linkData)),
    deleteLink: (id) => dispatch(actions.deleteLink(id)),
    editLink: (index, data) => dispatch(actions.updateLink(index, data)),
    loadLinks: () => dispatch(actions.loadLinks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialLinks);
