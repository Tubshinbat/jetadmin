import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import css from "./__.module.css";
import * as actions from "../../redux/actions/travelCategoryActions";

const CategoryList = (props) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const clickItem = (elId) => {
    setActiveMenu(elId);
    props.loadTravelCategory(elId);
  };

  useEffect(() => {
    setActiveMenu(props.travelNewId);
  }, [props.travelNewId]);

  const renderCategories = (categories, is_child = false) => {
    let myCategories = [];

    categories.map((el) => {
      myCategories.push(
        <li key={el._id}>
          <div
            className={`${css.ListItem}  ${
              activeMenu === el._id && css.Active
            }`}
            onClick={() => clickItem(el._id)}
          >
            {activeMenu === el._id ? (
              <i className="far fa-folder-open"></i>
            ) : (
              <i className="far fa-folder"></i>
            )}
            {el.name}
          </div>
          {el.children.length > 0 ? (
            <ul> {renderCategories(el.children, true)} </ul>
          ) : null}
        </li>
      );
    });
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
    loading: state.travelCategoryReducer.loading,
    travelCategory: state.travelCategoryReducer.selectData,
    travelNewId: state.travelCategoryReducer.selectData.category._id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTravelCategory: (travelID) =>
      dispatch(actions.loadTravelCategory(travelID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
