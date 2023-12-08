import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import css from "./__.module.css";
import * as actions from "../../redux/actions/menuActions";
import { useCookies } from "react-cookie";

const CategoryList = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  useEffect(() => {
    console.log(props.menus);
  }, []);
  const [activeMenu, setActiveMenu] = useState(null);

  const clickItem = (elId) => {
    setActiveMenu(elId);
    props.loadMenu(elId);
  };

  useEffect(() => {
    setActiveMenu(props.menuId);
  }, [props.menuId]);

  const upPosition = (id, position, oldPosition) => {
    const data = {
      id,
      position,
      oldPosition,
    };

    props.upDown(data);
  };
  const downPosition = (id, position, oldPosition) => {
    const data = {
      id,
      position,
      oldPosition,
    };

    props.upDown(data);
  };

  const renderUpDown = (position, length, id) => {
    const sortCount = parseInt(position);
    const total = parseInt(length);

    if (total === sortCount) {
      if (sortCount !== 1)
        return (
          <button
            onClick={() => upPosition(id, position - 1, position)}
            className={css.UpDownBtn}
          >
            <i className="fa fa-arrow-up"></i>
          </button>
        );
    } else if (sortCount === 1 && total !== sortCount) {
      return (
        <button
          onClick={() => downPosition(id, position + 1, position)}
          className={css.UpDownBtn}
        >
          <i className="fa fa-arrow-down"></i>
        </button>
      );
    } else {
      return (
        <>
          <button
            onClick={() => upPosition(id, position - 1, position)}
            className={css.UpDownBtn}
          >
            <i className="fa fa-arrow-up"></i>
          </button>
          <button
            onClick={() => downPosition(id, position + 1, position)}
            className={css.UpDownBtn}
          >
            <i className="fa fa-arrow-down"></i>
          </button>
        </>
      );
    }
  };

  const renderCategories = (categories, is_child = false) => {
    let myCategories = [];

    if (categories) {
      const length = categories.length;
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
              <div className={css.UpDown}>
                {renderUpDown(el.position, length, el._id)}
              </div>
              <span
                className={el[cookies.language].name === undefined && `redText`}
              >
                {el[cookies.language].name === undefined
                  ? (cookies.language === "mn" && el.eng.name) || el.mn.name
                  : el[cookies.language].name}
              </span>
            </div>
            {el.children.length > 0 ? (
              <ul> {renderCategories(el.children, true)} </ul>
            ) : null}
          </li>
        );
      });
    }
    if (is_child === false) {
      return myCategories.reverse();
    } else {
      return myCategories;
    }
  };

  return (
    <div className={css.CatList}>
      <ul className={css.CategoryList}>{renderCategories(props.category)}</ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.menuReducer.loading,
    menus: state.menuReducer.menus,
    newsCategory: state.menuReducer.selectData,
    menuId: state.menuReducer.selectData.category._id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMenu: (newsID) => dispatch(actions.getMenu(newsID)),
    upDown: (data) => dispatch(actions.upDown(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
