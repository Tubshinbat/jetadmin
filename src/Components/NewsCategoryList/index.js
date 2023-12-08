import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import css from "./__.module.css";
import * as actions from "../../redux/actions/newsCategoryActions";
import { useCookies } from "react-cookie";

const CategoryList = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  const [activeMenu, setActiveMenu] = useState(null);

  const clickItem = (elId) => {
    setActiveMenu(elId);
    props.loadNewsCategory(elId);
  };

  useEffect(() => {
    setActiveMenu(props.newsNewId);
  }, [props.newsNewId]);

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
    loading: state.newsCategoryReducer.loading,
    newsCategory: state.newsCategoryReducer.selectData,
    newsNewId: state.newsCategoryReducer.selectData.category._id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadNewsCategory: (newsID) => dispatch(actions.loadNewsCategory(newsID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
