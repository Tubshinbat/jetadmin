import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";

// HTML TAGS
import Section from "../../Components/General/Section";
import PageTitle from "../../Components/PageTitle";
import Button from "../../Components/General/Button";
import { Toast } from "react-bootstrap";
import CardBoby from "../../Components/General/CardBody";
import Spinner from "../../Components/General/Spinner";
import Spinner2 from "../../Components/General/Spinner2";
import Pagination from "react-js-pagination";
import Model from "../../Components/General/Model";
import ModelFooter from "../../Components/General/Model/ModelFooter";
import Dropdown from "../../Components/General/Dropdown";

// Styles
import css from "./__.module.css";

// Actions
import * as actions from "../../redux/actions/faqActions";
import { Link } from "react-router-dom";

const Question = (props) => {
  // INIT
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  const init = () => {
    props.faqInit();
    props.loadFaqs();
    setForm((bf) => ({
      answer: "",
      question: "",
    }));
  };

  useEffect(() => {
    init();
  }, []);

  // USESTATE's
  const [deleteModel, setDeleteModel] = useState(false);
  const [form, setForm] = useState({
    answer: "",
    question: "",
  });
  const [toast, setToast] = useState({
    toastHeader: "",
    toastBody: "",
    show: false,
    styleType: "toast",
  });

  const [editModel, setEditModel] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [selectId, setSelectId] = useState(null);
  const mdEdit = (el = null, id = null) => {
    setSelectId(id);
    let answer = "";
    let question = "";
    if (el[cookies.language] !== undefined) {
      answer = el[cookies.language].answer;
      question = el[cookies.language].question;
    }
    const data = {
      answer,
      question,
    };
    setSelectedData(() => data);
    setEditModel((bf) => {
      if (bf === true) return false;
      else return true;
    });
  };

  const handleEdit = (event) => {
    setSelectedData((bf) => ({
      ...bf,
      [event.target.name]: event.target.value,
    }));
  };

  const changeClick = () => {
    props.updateFaq(selectId, selectedData);
  };

  // Modeldelete
  const handleMDToggle = () => {
    deleteModel === false ? setDeleteModel(true) : setDeleteModel(false);
  };

  // Handle input change
  const handleChange = (event) => {
    setForm((bf) => ({
      ...bf,
      [event.target.name]: event.target.value,
    }));
  };

  // SaveButton
  const handleSave = () => {
    props.saveFaq(form);
  };

  //handleDelete
  const handleDelete = (id) => {
    props.deleteFaq(id);
  };

  // UseEffect save after
  useEffect(() => {
    if (props.faq !== null || props.success !== null) {
      setToast((bt) => ({
        toastHeader: "Амжилттай боллоо",
        toastBody: "Үйлдэл амжилттай боллоо",
        show: true,
        styleType: "bg-success",
      }));
      init();
    }
  }, [props.faq, props.success]);

  useEffect(() => {
    if (props.error) {
      // console.log(props.error);
      setToast((bs) => ({
        toastHeader: "Алдаа гарлаа...",
        toastBody: props.error,
        show: true,
        styleType: "bg-danger",
      }));
    }
  }, [props.error]);

  return (
    <>
      <Section>
        {props.loading && <Spinner />}
        <PageTitle name="Түгээмэл асуулт хариулт" />
        <div className="row">
          <div className={css.PanelControl}>
            <div className="col-md-4">
              <div className={css.PanelTabelHeader}>
                <Button
                  text="Асуулт хариулт нэмэх"
                  name="faqBtn"
                  clickHandle={handleMDToggle}
                  addIcon={<i className="fas fa-plus-circle"></i>}
                  btnClass="my-button"
                />
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <CardBoby>
              <div className={`card-body`}>
                <table className={`${css.newsTable} table`}>
                  <thead>
                    <tr>
                      <th>Асуулт </th>
                      <th> Хариулт </th>
                      <th>Үйлдэл</th>
                    </tr>
                  </thead>
                  {props.faqs.map((el) => (
                    <tr>
                      <td>
                        <p
                          className={`DropdownEl ${
                            el[cookies.language] === undefined && `redText`
                          }`}
                        >
                          {el[cookies.language] === undefined
                            ? (cookies.language === "mn" && el.eng.answer) ||
                              el.mn.answer
                            : el[cookies.language].answer}
                        </p>
                      </td>
                      <td>
                        <p
                          className={`DropdownEl ${
                            el[cookies.language] === undefined && `redText`
                          }`}
                        >
                          {el[cookies.language] === undefined
                            ? (cookies.language === "mn" &&
                                el.eng.question.substring(0, 50)) ||
                              el.mn.question.substring(0, 50)
                            : el[cookies.language].question.substring(0, 50)}
                          ...
                        </p>
                      </td>
                      <td>
                        <div className={css.AllActions}>
                          <a
                            className={`${css.Actions} ${css.Delete}`}
                            onClick={() => mdEdit(el, el._id)}
                          >
                            <i className="fas fa-edit"></i>
                          </a>
                          <a
                            className={`${css.Actions} ${css.Delete}`}
                            onClick={() => handleDelete(el._id)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </CardBoby>
          </div>
        </div>
      </Section>
      <Model show={editModel} handleToggle={mdEdit} modelName="Засварлах">
        <div className={css.FaqForm}>
          <label>Асуулт</label>
          <input
            type="text"
            className="form-control"
            placeholder="Асуулт"
            name="answer"
            value={selectedData.answer}
            onChange={handleEdit}
          />
        </div>
        <div className={css.FaqForm}>
          <label>Хариулт</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Хариулт"
            name="question"
            value={selectedData.question}
            onChange={handleEdit}
          />
        </div>
        <ModelFooter>
          <Button btnClass="btn-default" text="Болих" clickHandle={mdEdit} />
          <Button
            text="шинэчлэх"
            btnClass={` btn-success `}
            clickHandle={changeClick}
          />
        </ModelFooter>
      </Model>
      <Model
        show={deleteModel}
        handleToggle={handleMDToggle}
        modelName="Нийтлэг асуулт, хариулт"
      >
        {props.saving && <Spinner />}
        <div className={css.FaqForm}>
          <input
            type="text"
            className="form-control"
            placeholder="Асуулт"
            name="question"
            value={form.question}
            onChange={handleChange}
          />
        </div>
        <div className={css.FaqForm}>
          <textarea
            type="text"
            className="form-control"
            placeholder="Хариулт"
            name="answer"
            value={form.answer}
            onChange={handleChange}
          />
        </div>
        <ModelFooter>
          <Button
            btnClass="btn-default"
            text="Болих"
            clickHandle={handleMDToggle}
          />
          <Button
            text="Нэмэх"
            btnClass={` btn-success `}
            clickHandle={handleSave}
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.faqReducer.loading,
    saving: state.faqReducer.saving,
    success: state.faqReducer.success,
    faq: state.faqReducer.faq,
    error: state.faqReducer.error,
    faqs: state.faqReducer.faqs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    faqInit: () => dispatch(actions.faqInit()),
    saveFaq: (data) => dispatch(actions.saveFaq(data)),
    deleteFaq: (id) => dispatch(actions.deleteFaq(id)),
    loadFaqs: () => dispatch(actions.loadFaqs()),
    updateFaq: (id, data) => dispatch(actions.updateFaq(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
