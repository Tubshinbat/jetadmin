import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";
// HTML COMPONENTS
import Section from "../../Components/General/Section";
import PageTitle from "../../Components/PageTitle";
import CategoryList from "../../Components/NewsCategoryList";
import CardBoby from "../../Components/General/CardBody";
import Model from "../../Components/General/Model";
import Spinner from "../../Components/General/Spinner";

// MODELS
import Add from "./add";
import SubAdd from "./subAdd";
import Delete from "./delete";
import Change from "./change";

// LIB
import { toastControl } from "../../lib/toasControl";

// ACTIONS
import * as actions from "../../redux/actions/newsCategoryActions";

// STYLES
import css from "./__.module.css";

const NewsCategory = (props) => {
  // USESTATE
  const [activeMenu, setActiveMenu] = useState(null);

  // MODEL's status
  const [addModel, setAddModel] = useState(false);
  const [subModel, setSubModel] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);

  // USEEFFECT
  useEffect(() => {
    init();
  }, []);

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
  useEffect(() => {
    console.log(props.error);
    toastControl("error", props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.success) {
      toastControl("success", props.success);
      init();
    }
  }, [props.success]);

  //FUNCTIONS
  const init = () => {
    props.loadNewsCategories();
  };

  // -- click functions
  const toggleAddModel = () => {
    addModel ? setAddModel(false) : setAddModel(true);
  };

  const toggleSubModel = () => {
    subModel ? setSubModel(false) : setSubModel(true);
  };

  const toggleDeleteModel = () => {
    deleteModel ? setDeleteModel(false) : setDeleteModel(true);
  };

  const toggleEditModel = () => {
    editModel ? setEditModel(false) : setEditModel(true);
  };

  return (
    <Section>
      <PageTitle name={`Нийтлэлийн төрөл (${cookies.language})`} />
      {props.loading ? <Spinner /> : null}
      <div className={`PanelTabelHeader`}>
        <button
          name="mainCtgry"
          className="bg-success myButton addBtn btn"
          onClick={toggleAddModel}
        >
          <i className="fas fa-plus-circle"></i>Ангилал нэмэх
        </button>
      </div>
      <div className="row">
        <div className="col-md-8">
          <CardBoby>
            <CategoryList
              category={props.newsCategories}
              // active={activeMenu ? activeMenu : null}
            />
          </CardBoby>
        </div>
        <div className="col-md-4">
          <CardBoby>
            <div className={css.selectData}>
              <h5>
                <p> Сонгогдсон ангилал:</p>
              </h5>
              <span>
                {props.selectCategory.category[cookies.language] !== undefined
                  ? props.selectCategory.category[cookies.language].name
                  : `${cookies.language} хэл дээр ангиллын нэр байхгүй байна`}
              </span>
            </div>
            <div className={css.ControlBtn}>
              <button
                className={`btn myButton editBtn ${
                  props.selectCategory.category._id === "" && "disabled"
                }`}
                onClick={toggleEditModel}
              >
                <i className="far fa-edit"></i> Өөрчлөх
              </button>
              <button
                className={`btn myButton deleteBtn ${
                  props.selectCategory.category._id === "" && "disabled"
                }`}
                onClick={toggleDeleteModel}
              >
                <i className="far fa-trash-alt"></i> Устгах
              </button>
            </div>
          </CardBoby>
        </div>
      </div>
      <Model
        modelName="Ангилал шинээр нэмэх"
        show={addModel}
        handleToggle={toggleAddModel}
      >
        <Add handleToggle={toggleAddModel} />
      </Model>
      <Model
        modelName="Дэд ангилал нэмэх"
        show={subModel}
        handleToggle={toggleSubModel}
      >
        <SubAdd handleToggle={toggleSubModel} />
      </Model>

      <Model
        modelName="Ангилал устгах"
        show={deleteModel}
        handleToggle={toggleDeleteModel}
      >
        <Delete handleToggle={toggleDeleteModel} />
      </Model>

      <Model
        modelName="Өөрчлөлт хийх"
        show={editModel}
        handleToggle={toggleEditModel}
      >
        <Change handleToggle={toggleEditModel} />
      </Model>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Section>
  );
};

const mapStateToProps = (state) => {
  return {
    newsCategories: state.newsCategoryReducer.newsCategories,
    loading: state.newsCategoryReducer.loading,
    error: state.newsCategoryReducer.error,
    success: state.newsCategoryReducer.success,
    selectCategory: state.newsCategoryReducer.selectData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadNewsCategories: () => dispatch(actions.loadNewsCategories()),
    saveNews: (category) => dispatch(actions.saveNewsCategory(category)),
    deleteCategory: (catId) => dispatch(actions.deleteNewsCategory(catId)),
    updateCategory: (category) =>
      dispatch(actions.updateNewsCategory(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsCategory);
