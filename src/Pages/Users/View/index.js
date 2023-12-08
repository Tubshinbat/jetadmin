import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import base from "../../../base";
// HTML TAGS COMPONENTS
import CardBoby from "../../../Components/General/CardBody";
import ColDiv from "../../../Components/General/ColDiv";
import Section from "../../../Components/General/Section";
import PageTitle from "../../../Components/PageTitle";
import { Markup } from "interweave";
import Button from "../../../Components/General/Button";
import AlertWarning from "../../../Components/General/AlertWarning";
import Spinner from "../../../Components/General/Spinner";
import Dropzone from "../../../Components/General/Dropzone";
import { Toast } from "react-bootstrap";

// ACTIONS

import { allRemove } from "../../../redux/actions/imageActions";
import * as actions from "../../../redux/actions/userActions";

// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  // USESTATE
  const [form, setForm] = useState({
    status: false,
    name: null,
    avatar: null,
    email: null,
    role: null,
    password: null,
    confirmPassword: null,
  });
  const [isError, setIsError] = useState(true);
  const [formError, setFormError] = useState({
    status: false,
    name: false,
    email: false,
    role: false,
    password: false,
    confirmPassword: false,
  });

  const [toast, setToast] = useState({
    toastHeader: "",
    toastBody: "",
    show: false,
    styleType: "toast",
  });

  // Page init
  useEffect(() => {
    props.removePhotos();
    props.getUser(props.match.params.id);
  }, []);

  // BackGo Button
  const backGo = () => {
    props.history.goBack();
  };

  //Functions

  useEffect(() => {
    if (props.user) {
      setForm(() => ({
        ...props.user,
      }));
    }
  }, [props.user]);

  return (
    <>
      <Section>
        {props.loading && <Spinner />}
        <PageTitle name="Хэрэглэгч нэмэх" />
        <ColDiv Allcss="row">
          <ColDiv Allcss="col-md-8">
            <CardBoby>
              <div className={`${css.AddForm} row`}>
                <div className="col-md-6">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}> Нэр </p>
                    <div className={css.DetialP}> {form.name}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}> Имэйл хаяг </p>
                    <div className={css.DetialP}> {form.email}</div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}> Хэрэглэгчийн эрх </p>
                    <div className={css.DetialP}> {form.role}</div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className={css.Btns}>
                    <Button
                      text="Буцах"
                      name="dont"
                      clickHandle={backGo}
                      btnClass=" btn-default btn-sm"
                    />
                  </div>
                </div>
              </div>
            </CardBoby>
          </ColDiv>
          <ColDiv Allcss="col-md-4">
            <div className="card card-primary card-outline">
              <div className="card-header">
                <h3 className="card-title">ТОХИРГОО</h3>
              </div>
              <div className="card-body box-profile">
                <div className="form-group">
                  <p className={`${css.Title}`}> Хэрэглэгчийн эрх </p>
                  <div className={css.DetialP}>
                    {form.status === true ? "Идэвхтэй" : "Түр хандах эрхгүй"}
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-primary card-outline">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="far fa-image"></i> Хэрэглэгчийн нүүр зураг
                </h3>
              </div>
              <div className="card-body box-profile">
                <div className={css.CategoryBox}>
                  <div className="form-group">
                    {form.avatar && (
                      <img
                        src={`${base.cdnUrl}uploads/avatar/150x150/${form.avatar}`}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ColDiv>
        </ColDiv>
        {/* </form> */}
      </Section>
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
    images: state.imageReducer.files,
    error: state.userReducer.error,
    user: state.userReducer.user,
    loading: state.userReducer.loading,
    isUpdate: state.userReducer.isUpdate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePhotos: () => dispatch(allRemove()),
    getUser: (id) => dispatch(actions.getUser(id)),
    updateUser: (id, data) => dispatch(actions.updateUser(id, data)),
    updateInit: () => dispatch(actions.updateUserInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
