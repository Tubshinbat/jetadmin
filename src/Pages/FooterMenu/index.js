import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";

// HTML COMPONENTS
import Section from "../../Components/General/Section";
import PageTitle from "../../Components/PageTitle";
import CategoryList from "../../Components/FooterList";
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
import * as actions from "../../redux/actions/FooterMenuActions";

// STYLES
import css from "./__.module.css";

const FooterMenu = (props) => {
  // USESTATE
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  const [activeMenu, setActiveMenu] = useState(null);

  // MODEL's status
  const [addModel, setAddModel] = useState(false);
  const [subModel, setSubModel] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);

  // USEEFFECT
  useEffect(() => {
    init();
  }, []);

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
  useEffect(() => {
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
    props.loadMenus();
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
      <PageTitle name="Сайтын хөлний цэс" />
      {props.loading ? <Spinner /> : null}
      <div className={`PanelTabelHeader`}>
        <button
          name="mainCtgry"
          className="bg-success myButton addBtn btn"
          onClick={toggleAddModel}
        >
          <i className="fas fa-plus-circle"></i>Цэс нэмэх
        </button>
        <button
          onClick={toggleSubModel}
          className={`myButton btn subBtn  ${
            props.selectCategory.category._id === "" && "disabled"
          }`}
          name="subCrgry"
        >
          <i className="fas fa-plus-circle"></i> Дэд ангилал нэмэх
        </button>
      </div>
      <div className="row">
        <div className="col-md-8">
          <CardBoby>
            <CategoryList
              category={props.menus}
              // active={activeMenu ? activeMenu : null}
            />
          </CardBoby>
        </div>
        <div className="col-md-4">
          <CardBoby>
            <div className={css.selectData}>
              <h5>
                <p> Сонгогдсон цэс:</p>
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
    menus: state.footerMenuReducer.menus,
    loading: state.footerMenuReducer.loading,
    error: state.footerMenuReducer.error,
    success: state.footerMenuReducer.success,
    selectCategory: state.footerMenuReducer.selectData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadMenus: () => dispatch(actions.loadMenus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterMenu);
