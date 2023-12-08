import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import css from "./__.module.css";
import * as actions from "../../redux/actions/mediaCategoryActions";
import { useCookies } from "react-cookie";

const CategoryList = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  const [activeMenu, setActiveMenu] = useState(null);

  const clickItem = (elId) => {
    setActiveMenu(elId);
    props.loadMediaCategory(elId);
  };

  useEffect(() => {
    setActiveMenu(props.mediaNewId);
  }, [props.mediaNewId]);

  const renderCategories = (categories) => {
    let myCategories = [];
    categories &&
      categories.map((el) => {
        myCategories.push(
          <li key={el._id}>
            <div
              className={`${css.ListItem}  ${
                activeMenu === el._id ? css.Active : null
              }`}
              onClick={() => clickItem(el._id)}
            >
              {activeMenu === el._id ? (
                <i className="far fa-folder-open"></i>
              ) : (
                <i className="far fa-folder"></i>
              )}
              <span
                className={el[cookies.language].name === undefined && `redText`}
              >
                {el[cookies.language].name === undefined
                  ? (cookies.language === "mn" && el.eng.name) || el.mn.name
                  : el[cookies.language].name}
              </span>
            </div>
            {el.children.length > 0 ? (
              <ul> {renderCategories(el.children)} </ul>
            ) : null}
          </li>
        );
      });

    return myCategories;
  };

  return (
    <div className={css.CatList}>
      <ul className={css.CategoryList}>{renderCategories(props.category)}</ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.mediaCategoryReducer.loading,
    mediaCategory: state.mediaCategoryReducer.selectData,
    mediaNewId: state.mediaCategoryReducer.selectData.category._id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMediaCategory: (mediaID) =>
      dispatch(actions.loadMediaCategory(mediaID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
