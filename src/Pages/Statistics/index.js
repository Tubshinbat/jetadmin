import React, { useEffect, Text, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { ToastContainer } from "react-toastify";
import { toastControl } from "../../lib/toasControl";
import Pagination from "react-js-pagination";
import myBase from "../../base";
import { useCookies } from "react-cookie";

// ACTIONS
import * as actions_statistic from "../../redux/actions/statisticsActions";
import * as actions_statisticSub from "../../redux/actions/statisticsSubActions";

//STYLES
import css from "./__.module.css";

// -- HTML
import Section from "../../Components/General/Section";
import PageTitle from "../../Components/PageTitle";
import Dropdown from "../../Components/General/Dropdown";
import CardBoby from "../../Components/General/CardBody";
import Spinner from "../../Components/General/Spinner";
import Spinner2 from "../../Components/General/Spinner2";
import Model from "../../Components/General/Model";

//-- filter Image
import notfound from "../../notfound.svg";
import { requiredCheck } from "../../lib/inputRegex";

const Statistics = (props) => {
  // -- USESTATE
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);

  // STATISTICS USESTATE
  const [checked, setChecked] = useState([]);
  const [statistic, setStatistic] = useState({});
  const [editModel, setEditModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [editData, setEditData] = useState("");
  const [selectId, setSelectId] = useState("");
  const [error, setError] = useState({
    name: false,
  });

  // SUB USESTATE
  const [subData, setSubData] = useState({});
  const [subError, setSubError] = useState({
    name: false,
    count: false,
  });
  const [subEditError, setSubEditError] = useState({
    name: false,
    count: false,
  });
  const [editSubModel, setEditSubModel] = useState(false);
  const [deleteSubModel, setDeleteSubModel] = useState(false);
  const [selectedSub, setSelectedSub] = useState({});
  const [subId, setSubId] = useState(null);

  useEffect(() => {
    toastControl("error", props.error || props.subError);
  }, [props.error, props.subError]);

  useEffect(() => {
    toastControl("success", props.success || props.successSub);
    init();
  }, [props.success, props.successSub]);

  useEffect(() => {
    if (props.activeStatistic) {
      setChecked(() => props.activeStatistic._id);
      setSubError((bf) => ({ ...bf, statistic: true }));
      setSubData((bf) => ({ ...bf, statistic: props.activeStatistic._id }));
      props.loadStatisticsSub(`main=${props.activeStatistic._id}`);
    } else {
      setSubError((bf) => ({
        ...bf,
        statistic: "Үндсэн статистик сонгоно уу",
      }));
    }
  }, [props.activeStatistic]);

  const init = () => {
    props.clear();
    props.clearSub();
    props.getActive();
    setStatistic(() => ({
      name: "",
    }));
    props.loadStatistics();
  };

  useEffect(() => {
    console.log(props.statisticsSub);
  }, [props.statisticsSub]);

  const checkName = (el, name) => {
    return name === el;
  };

  // STATISTICS FUNCTIONS
  const handleMain = (event) => {
    setStatistic((bf) => ({ ...bf, [event.target.name]: event.target.value }));
    checkMain(event.target.name, event.target.value);
  };

  const handleRadio = (event) => {
    if (event.target.value) {
      setChecked(event.target.value);
      setSubData((bf) => ({ ...bf, statistic: event.target.value }));
      props.loadStatisticsSub(`main=${event.target.value}`);
      setSubError((bf) => ({
        ...bf,
        statistic: true,
      }));
    } else {
      setSubError((bf) => ({
        ...bf,
        statistic: "Үндсэн статистикаас сонгоно уу",
      }));
    }
  };

  const is_check = (id) => {
    let result = false;
    if (checked === id) return (result = true);
    return result;
  };

  //CHECK FROM
  const checkMain = (name, val) => {
    // Шалгах формуудаа энд тодорхойлоно
    const valueErrors = Object.keys(error);
    if (valueErrors.find((el) => checkName(el, name))) {
      let result = requiredCheck(val);
      setError((bfError) => ({ ...bfError, [name]: result }));
    }
  };

  const addStatistic = () => {
    if (error.name === true) props.addStatistic(statistic);
    else
      toastControl(
        "error",
        "Заавал бөглөх талбар бөглөнө үү дахин оролдоно уу!"
      );
  };

  const saveActive = () => {
    if (checked) {
      const data = {
        status: true,
      };
      props.updateStatistic(checked, data);
    }
  };

  const editChange = (event) => {
    setEditData(event.target.value);
  };

  // MODELS
  const mdEdit = (el = null, id = null) => {
    let elName = "";
    setSelectId(id);

    if (el) {
      if (el[cookies.language] === undefined) {
        elName = "";
      } else {
        elName = el[cookies.language].name;
      }
    }

    setEditModel((bf) => {
      if (bf === true) return false;
      else return true;
    });
    setEditData(() => elName);
  };

  const mdDelete = (id = null) => {
    setDeleteModel((bf) => {
      if (bf === true) return false;
      else return true;
    });
    if (id) setSelectId(id);
  };

  const deleteSt = () => {
    props.deleteStatistic(selectId);
    mdDelete();
  };

  const updateSt = () => {
    const data = {
      name: editData,
    };
    props.updateStatistic(selectId, data);
    mdEdit();
  };

  // SUB STATISTICS

  const editSubChange = (event) => {
    setSelectedSub((bf) => ({
      ...bf,
      [event.target.name]: event.target.value,
    }));
    const result = requiredCheck(event.target.value);
    setSubEditError((bf) => ({ ...bf, [event.target.name]: result }));
  };

  const handleSub = (event) => {
    setSubData((bf) => ({ ...bf, [event.target.name]: event.target.value }));
    const result = requiredCheck(event.target.value);
    setSubError((bf) => ({ ...bf, [event.target.name]: result }));
  };

  const trueCheck = (error) => {
    let errorCount = 0;
    let errorValues = Object.values(error);
    errorValues.map((el) => {
      el === true && errorCount++;
    });
    return errorValues.length === errorCount;
  };

  const addSub = () => {
    if (trueCheck(subError)) {
      props.addStatisticSub(subData);
      setSubData(() => ({ name: "", count: "" }));
    } else {
      toastControl("error", "талбарууд хоосон байж болохгүй");
    }
  };

  const mdSubEdit = (el = null, id = null) => {
    let name = "";
    if (el[cookies.language] !== undefined) name = el[cookies.language].name;
    const data = {
      name,
      count: el.count,
      statistic: checked,
    };
    setSubId(id);
    setSelectedSub(() => data);
    if (name && el.count) setSubEditError(() => ({ name: true, count: true }));
    setEditSubModel((bf) => {
      if (bf === true) return false;
      else return true;
    });
  };

  const mdSubDelete = (id = null) => {
    setSubId(id);
    setDeleteSubModel((bf) => {
      if (bf === true) return false;
      else return true;
    });
  };

  const updateSub = () => {
    if (trueCheck(subEditError)) {
      props.updateSub(subId, selectedSub);
    } else {
      toastControl("error", "Талбарууд хоосон байж болохгүй");
    }
  };

  const deleteSub = () => {
    props.deleteStatisticSub(subId);
    mdSubDelete();
  };

  return (
    <Section>
      <MetaTags>
        <title> Статистик | WEBR Control Panel</title>
        <meta name="description" content="Нийтлэл | WeBR control panel" />
        <meta property="og:title" content="Нийтлэл | web control panel" />
      </MetaTags>
      <PageTitle name={`Статистик ( ${cookies.language} )`} />

      <div className={css.PanelControl}>
        <div className="row">
          <div className="col-md-4">
            <CardBoby>
              <div className={css.MainList}>
                <div className="form-group input-group-sm">
                  <p className={css.Title}> Үндсэн статистик </p>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Статистикын нэр: Нийт оюутан, нийт төгсөгч"
                    value={statistic.name}
                    onChange={handleMain}
                  />
                  {error.name && (
                    <span className={`litleError`}>{error.name}</span>
                  )}
                </div>
                <div className="form-group input-group-sm">
                  <button
                    name="addBtn"
                    className="myButton addBtn"
                    onClick={addStatistic}
                  >
                    Нэмэх
                  </button>
                </div>
              </div>
              <hr />
              <p className={css.Title}>Одоо байгаа статистикууд</p>
              <span className={css.TitleLittle}>
                /сонгогдсон байгаа нь одоогоор идэвхтэй харагдаж байгаа/{" "}
              </span>
              {props.loading ? <Spinner /> : null}
              {props.statistics &&
                props.statistics.map((el) => (
                  <li key={el._id} className={css.ListS}>
                    <input
                      type="radio"
                      name="statistics"
                      checked={is_check(el._id)}
                      onChange={handleRadio}
                      value={el._id}
                    />
                    <div className={css.ListEl}>
                      <span
                        className={
                          el[cookies.language] === undefined && `redText`
                        }
                      >
                        {el[cookies.language] === undefined
                          ? (cookies.language === "mn" && el.eng.name) ||
                            el.mn.name
                          : el[cookies.language].name}
                      </span>
                      <div className={css.LControl}>
                        <button
                          className={css.EditBtn}
                          onClick={() => mdEdit(el, el._id)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className={css.DeleteBtn}
                          onClick={() => mdDelete(el._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              <hr />
              <div className="form-group input-group-sm">
                <button
                  name="addBtn"
                  className="myButton addBtn"
                  onClick={saveActive}
                >
                  Хадгалах
                </button>
              </div>
            </CardBoby>
          </div>
          <div className="col-md-8">
            <CardBoby>
              <div className="row">
                <h6> Үндсэн статистикийн хуваалт </h6>
                <div className="col-md-6 form-grop input-group-sm">
                  <p className={css.Title}> Гарчиг </p>
                  <input
                    type="text"
                    name="name"
                    placeholder="Жишээ нь: Бакалавр, магистр"
                    className="form-control"
                    value={subData.name}
                    onChange={handleSub}
                  />
                  {subError.name && (
                    <span className={`litleError`}>{subError.name}</span>
                  )}
                </div>
                <div className="col-md-4 form-grop input-group-sm">
                  <p className={css.Title}> Тоон дүн </p>
                  <input
                    type="number"
                    name="count"
                    placeholder="Тоо дүн"
                    className="form-control"
                    value={subData.count}
                    onChange={handleSub}
                  />
                  {subError.count && (
                    <span className={`litleError`}>{subError.count}</span>
                  )}
                </div>
                <div className="col-md-2">
                  <p className={css.Title}> Нэмэх </p>
                  <button className="myButton addBtn" onClick={addSub}>
                    Нэмэх
                  </button>
                </div>
              </div>
              <hr />
              {props.loadingSub ? <Spinner /> : null}
              {props.statisticsSub &&
                props.statisticsSub.map((el) => (
                  <li key={el._id} className={css.ListS}>
                    <div className={css.ListEl}>
                      <span
                        className={
                          el[cookies.language] === undefined && `redText`
                        }
                      >
                        {el[cookies.language] === undefined
                          ? (cookies.language === "mn" && el.eng.name) ||
                            el.mn.name
                          : el[cookies.language].name}
                        ( {el.count} )
                      </span>
                      <div className={css.LControl}>
                        <button
                          className={css.EditBtn}
                          onClick={() => mdSubEdit(el, el._id)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className={css.DeleteBtn}
                          onClick={() => mdSubDelete(el._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </CardBoby>
          </div>
        </div>
      </div>

      <Model modelName="Засварлах" show={editModel} handleToggle={mdEdit}>
        {props.loading ? <Spinner /> : null}
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            value={editData}
            onChange={editChange}
          />
        </div>
        <div className={css.BtnGroup}>
          <button className="btn btn-success btn-sm" onClick={updateSt}>
            {" "}
            Хадгалах{" "}
          </button>
          <button className="btn btn-light btn-sm" onClick={mdEdit}>
            Болих
          </button>
        </div>
      </Model>

      <Model modelName="Устгах" show={deleteModel} handleToggle={mdDelete}>
        {props.loading ? <Spinner /> : null}
        <div className="form-group">Та устгахдаа итгэлтэй байна уу</div>
        <div className={css.BtnGroup}>
          <button className="btn btn-danger btn-sm" onClick={deleteSt}>
            Устгах
          </button>
        </div>
      </Model>

      <Model modelName="Засварлах" show={editSubModel} handleToggle={mdSubEdit}>
        {props.loadingSub ? <Spinner /> : null}
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Гарчиг"
            value={selectedSub.name}
            onChange={editSubChange}
          />
          {subEditError.name && (
            <span className={`litleError`}>{subEditError.name}</span>
          )}
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="number"
            name="count"
            value={selectedSub.count}
            placeholder="Тоон үзүүлэлт"
            onChange={editSubChange}
          />
          {subEditError.count && (
            <span className={`litleError`}>{subEditError.count}</span>
          )}
        </div>
        <hr />
        <div className={css.BtnGroup}>
          <button className="btn btn-success btn-sm" onClick={updateSub}>
            Хадгалах
          </button>
        </div>
      </Model>
      <Model
        modelName="Устгах"
        show={deleteSubModel}
        handleToggle={mdSubDelete}
      >
        {props.loadingSub ? <Spinner /> : null}
        <div className="form-group">Та устгахдаа итгэлтэй байна уу</div>
        <div className={css.BtnGroup}>
          <button className="btn btn-danger btn-sm" onClick={deleteSub}>
            Устгах
          </button>
        </div>
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
    loading: state.statisticsReducer.loading,
    loadingSub: state.statisticsSubReducer.loading,
    successSub: state.statisticsSubReducer.success,
    success: state.statisticsReducer.success,
    errorSub: state.statisticsSubReducer.error,
    error: state.statisticsReducer.error,
    statistics: state.statisticsReducer.statistics,
    statistic: state.statisticsReducer.statistic,
    activeStatistic: state.statisticsReducer.activeStatistic,
    statisticsSub: state.statisticsSubReducer.subStatistics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearSub: () => dispatch(actions_statisticSub.clear()),
    clear: () => dispatch(actions_statistic.clear()),
    updateStatistic: (id, data) =>
      dispatch(actions_statistic.updateStatistics(id, data)),
    getActive: () => dispatch(actions_statistic.getActiveStatistic()),
    loadStatistics: () => dispatch(actions_statistic.loadStatistics()),
    loadStatisticsSub: (query) =>
      dispatch(actions_statisticSub.loadStatisticsSub(query)),
    addStatistic: (data) => dispatch(actions_statistic.saveStatistics(data)),
    addStatisticSub: (data) =>
      dispatch(actions_statisticSub.saveStatisticsSub(data)),
    deleteStatistic: (id) => dispatch(actions_statistic.deleteStatistic(id)),
    deleteStatisticSub: (id) =>
      dispatch(actions_statisticSub.deleteStatisticSub(id)),
    getStatistic: (id) => dispatch(actions_statistic.getStatistic(id)),
    getStatisticSub: (id, main) =>
      dispatch(actions_statisticSub.getStatisticSub(id, main)),
    updateSub: (id, data) =>
      dispatch(actions_statisticSub.updateStatisticSub(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
