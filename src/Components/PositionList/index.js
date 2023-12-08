import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import css from "./__.module.css";
import * as actions from "../../redux/actions/positionActions";
import { useCookies } from "react-cookie";

const PositionList = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  const [activeMenu, setActiveMenu] = useState(null);

  const clickItem = (elId) => {
    setActiveMenu(elId);
    props.getPosition(elId);
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
              <span className={el[cookies.language] === undefined && `redText`}>
                {el[cookies.language] === undefined
                  ? (cookies.language === "mn" && el.eng.name) || el.mn.name
                  : el[cookies.language].name}
              </span>
            </div>
          </li>
        );
      });

    return myCategories;
  };

  return (
    <div className={css.CatList}>
      <ul className={css.CategoryList}>{renderCategories(props.positions)}</ul>
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
    getPosition: (newsID) => dispatch(actions.getPosition(newsID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PositionList);
