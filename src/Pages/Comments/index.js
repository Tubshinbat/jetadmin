import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";

// HTML TAGS
import Button from "../../Components/General/Button";
import CardBoby from "../../Components/General/CardBody";
import ColDiv from "../../Components/General/ColDiv";
import Section from "../../Components/General/Section";
import PageTitle from "../../Components/PageTitle";
import Spinner from "../../Components/General/Spinner";
import Pagination from "react-js-pagination";
import Spinner2 from "../../Components/General/Spinner2";
import Dropdown from "../../Components/General/Dropdown";
import Model from "../../Components/General/Model";
import ModelFooter from "../../Components/General/Model/ModelFooter";
import { Toast } from "react-bootstrap";

// ACTIONS
import * as actions from "../../redux/actions/commentAction";

//STYLES
import css from "./__.module.css";

//-- filter Image
import notfound from "../../notfound.svg";

const Comments = (props) => {
  //-- PAGINATION
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  //-- FILTER
  const [select, setSelect] = useState("name comment createAt");
  const [sort, setSort] = useState(`"createAt": -1`);
  const [searchText, setSearchText] = useState("");
  const [notFound, setNotFound] = useState(false);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const [toast, setToast] = useState({
    toastHeader: "",
    toastBody: "",
    show: false,
    styleType: "toast",
  });

  // DELETE CHECKBOX

  const [chkBox, setChkBox] = useState([]);
  const [deleteModel, setDeleteModel] = useState(false);

  // INIT
  const init = async () => {
    setSort(`"createAt": -1`);
    setActivePage(1);
    setSearchText("");

    props.loadComments(`select=${select}&sort=${sort}`);
  };

  useEffect(() => {
    init();
  }, []);

  // Load News - ууд ирсэн үед
  useEffect(() => {
    if (props.comments) {
      if (typeof props.comments === "object" && props.comments.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    }
  }, [props.comments]);

  // PAGINATION USEEFFECT
  useEffect(() => {
    if (props.pageLast) {
      setTotal(props.pageLast.total);
      setLimit(props.pageLast.limit);
    }
  }, [props.pageLast]);

  useEffect(() => {
    props.loadComments(
      `select=${select}&sort=${sort}&name=${searchText}&page=${activePage}`
    );
  }, [activePage]);

  const multDelete = async () => {
    // console.log(chkBox);
    let ids = [];
    chkBox.map((el) => {
      ids.push(el.id);
    });

    await props.deleteMultComment(ids);
    await init();
    await setDeleteModel(false);

    setToast({
      toastHeader: "Амжилттай",
      toastBody: "Амжилттай устгатлаа",
      show: true,
      styleType: "bg-success",
    });
  };

  // FILTER HANDLE
  const handleChange = (e) => {
    setSearchText(e.target.value);
    props.loadPagination(props.pageLast);
    props.loadComments(
      `select=${select}&sort=${sort}&name=${e.target.value}&page=${activePage}`
    );
  };

  const refresh = () => {
    init();
  };

  const handleMDToggle = () => {
    deleteModel === false ? setDeleteModel(true) : setDeleteModel(false);
  };

  const handleChk = (e) => {
    let ch = chkBox;
    let checks = [];
    if (e.target.checked === false) {
      ch.map((el, index) => {
        if (el.id === e.target.value) {
          ch.splice(index, 1);
        }
      });
    } else {
      checks[e.target.value] = { check: e.target.checked, id: e.target.value };
      ch.push(checks[e.target.value]);
    }

    setChkBox((b) => [...b]);
  };
  return (
    <Section>
      <MetaTags>
        <title>Webr | ВЭБ УДИРДЛАГЫН СИСТЕМ V1</title>
        <meta name="description" content="Some description." />
        <meta property="og:title" content="MyApp" />
        <meta property="og:image" content="path/to/image.jpg" />
      </MetaTags>
      {props.loading ? <Spinner /> : null}
      <PageTitle name="Сайтын сэтгэгдэл" />
      <ColDiv Allcss="row">
        <div className={css.PanelControl}>
          <ColDiv Allcss="col-md-4">
            <div className={css.PanelTabelHeader}>
              <Button
                text="Сэргээх"
                name="news"
                clickHandle={refresh}
                addIcon={<i className="fas fa-redo-alt"></i>}
                btnClass="my-button"
              />
              {chkBox.length > 0 && (
                <Button
                  text="Устгах"
                  name="news"
                  clickHandle={handleMDToggle}
                  addIcon={<i className="fas fa-trash-alt"></i>}
                  btnClass="my-button"
                />
              )}
            </div>
          </ColDiv>

          <ColDiv Allcss="col-md-8">
            <ColDiv Allcss="row">
              <div className="col-md-8"></div>
              <ColDiv Allcss="col-md-4">
                <ColDiv Allcss="form-group">
                  <input
                    type="text"
                    name="searchText"
                    className="form-control my-input"
                    placeholder="Хайлт хийх..."
                    onChange={handleChange}
                    value={searchText && searchText}
                  />
                </ColDiv>
              </ColDiv>
            </ColDiv>
          </ColDiv>
        </div>

        <ColDiv Allcss="col-md-12">
          <CardBoby>
            <div className="card-header">
              <h3 className="card-title" style={{ fontSize: 14 }}>
                Сонгогдсон : {chkBox.length}
              </h3>
              <div className={`card-tools ${css.Pagination}`}>
                {!total ? (
                  <Spinner2 />
                ) : (
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={limit}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange.bind()}
                  />
                )}
              </div>
            </div>
            <div className={`card-body`}>
              {notFound === true ? (
                <div className={css.Notfound}>
                  <p> "Илэрц олдсонгүй" </p>
                  <img src={notfound} />
                </div>
              ) : (
                <table className={`${css.newsTable} table`}>
                  <thead>
                    <tr>
                      <th style={{ width: 50 }}></th>

                      <th>Гарчиг</th>
                      <th> Сэтгэгдэл</th>
                      <th> Нийтлэл</th>
                      <th>Нэмсэн огноо</th>
                      <th>Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody style={{ width: "100%" }}>
                    {props.loading ? (
                      <div>
                        <Spinner />
                      </div>
                    ) : (
                      props.comments &&
                      props.comments.map((el, index) => (
                        <tr key={el._id}>
                          <td>
                            <input
                              type="checkbox"
                              value={el._id}
                              className="chk"
                              onChange={handleChk}
                            />
                          </td>

                          <td>{el.name}</td>

                          <td>
                            <strong>{el.comment} </strong>
                          </td>

                          <td>{el.news && el.news.name}</td>
                          <td>{el.createAt}</td>
                          <td>
                            <div className={css.AllActions}>
                              <Link
                                className={`${css.Actions} ${css.View}`}
                                to={`https://adw.naog.edu.mn/page/${el.slug}`}
                              >
                                <i className="fas fa-info"></i>
                              </Link>
                              <Link
                                className={`${css.Actions} ${css.Edit}`}
                                to={`/page/edit/${el._id}`}
                              >
                                <i className="fas fa-pencil-alt"></i>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
              <div className={css.DashboardFooter}>
                <p>
                  Нийт дата: <strong> {total} </strong>
                </p>
              </div>
            </div>
          </CardBoby>
        </ColDiv>
      </ColDiv>
      <Model
        show={deleteModel}
        CloseModel={handleMDToggle}
        modelName="Та устгахдаа итгэлтэй байна уу?"
      >
        <div>
          <p>
            Сонгогдсон нийт: <strong> {chkBox.length} </strong> нийтлэл байна
            устгахдаа итгэлтэй байна уу ?
          </p>
        </div>
        <ModelFooter>
          <Button
            btnClass="btn-default"
            text="Болих"
            clickHandle={handleMDToggle}
          />
          <Button
            text="Тийм"
            btnClass={` btn-danger  ${chkBox.length < 0 && "disabled"}`}
            clickHandle={chkBox.length > 0 ? multDelete : null}
          />
        </ModelFooter>
      </Model>

      <Toast
        className={`${css.Toast} ${toast.styleType}`}
        onClose={() =>
          setToast((toastBefore) => ({ ...toastBefore, show: false }))
        }
        show={toast.show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">{toast.toastHeader}</strong>
        </Toast.Header>
        <Toast.Body>{toast.toastBody}</Toast.Body>
      </Toast>
    </Section>
  );
};

const mapStateToProps = (state) => {
  return {
    comments: state.commentReducer.comments,
    pageLast: state.commentReducer.paginationLast,
    loading: state.commentReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadComments: (query) => dispatch(actions.loadComments(query)),
    loadPagination: (pageLast) => dispatch(actions.loadPagination(pageLast)),
    deleteMultComment: (ids) => dispatch(actions.deleteMultComment(ids)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
