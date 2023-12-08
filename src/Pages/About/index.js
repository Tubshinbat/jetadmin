import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// Import components
import base from "../../base";

// ELEMENT HTML
import ColDiv from "../../Components/General/ColDiv";
import Section from "../../Components/General/Section";
import PageTitle from "../../Components/PageTitle";
import Button from "../../Components/General/Button";
import CardBoby from "../../Components/General/CardBody";
import { Editor } from "@tinymce/tinymce-react";
import Dropzone from "../../Components/General/Dropzone";
import { Toast } from "react-bootstrap";

// ACTIONS
import * as actions from "../../redux/actions/aboutActions";

// Style
import css from "./__.module.css";

const About = (props) => {
  // INIT
  useEffect(() => {
    props.loadAbout();
  }, []);

  // USESTATE's
  const [form, setForm] = useState({
    picture: "",
    about: "",
  });
  // -- USESTATE TOAST
  const [toast, setToast] = useState({
    toastHeader: "",
    toastBody: "",
    show: false,
    styleType: "toast",
  });

  useEffect(() => {
    console.log(props.about);
    if (props.about !== null) {
      setForm((bf) => ({ ...props.about[0] }));
    }
  }, [props.about]);

  // input change
  const textAreaChange = (event) => {
    if (event.target.getContent()) {
      setForm((beforeForm) => ({
        ...beforeForm,
        about: event.target.getContent(),
      }));
    }
  };

  useEffect(() => {
    if (props.images)
      setForm((beforeForm) => ({
        ...beforeForm,
        picture: props.images.shift(),
      }));
  }, [props.images]);

  const handleSave = () => {
    const formData = new FormData();
    Object.keys(form).map((index) => {
      formData.append(index, form[index]);
    });
    // props.saveAbout(formData);
  };

  const updateSave = () => {
    const formData = new FormData();
    Object.keys(form).map((index) => {
      formData.append(index, form[index]);
    });
    props.updateAbout(form._id, formData);
    console.log(form);
  };

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна

  useEffect(() => {
    if (props.error) {
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
        <PageTitle name="Бидний тухай" />
        <ColDiv Allcss="row">
          <ColDiv Allcss="col-md-12">
            <CardBoby>
              <div className={`card-body`}>
                <div className="col-md-12">
                  <div className="form-group">
                    <p className={`${css.Title}`}> Бидний тухай </p>
                    {props.about && (
                      <Editor
                        apiKey="2nubq7tdhudthiy6wfb88xgs36os4z3f4tbtscdayg10vo1o"
                        name="details"
                        initialValue={props.about[0].about}
                        init={{
                          height: 300,
                          menubar: false,
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount image",
                          ],
                          toolbar:
                            "undo redo | formatselect | bold italic backcolor | \
                          alignleft aligncenter alignright alignjustify | \
                          bullist numlist outdent indent | removeformat | help | link image",
                          file_picker_types: "image",
                          automatic_uploads: false,
                        }}
                        onChange={textAreaChange}
                      />
                    )}
                    <p className={`${css.Title}`}> Зураг </p>
                    <Dropzone />
                    <hr />
                    <p>Одоо байгаа зураг: </p>
                    <img
                      src={
                        props.about &&
                        `${base.cdnUrl}uploads/${props.about[0].picture}`
                      }
                      className={css.PreviewImg}
                    />
                    <hr />
                    <p>Шинжлэгдэх зураг: </p>
                    <img
                      src={form.picture && form.picture.preview}
                      className={css.PreviewImg}
                    />
                    <div className="col-md-12">
                      <div className={css.Btns}>
                        <Button
                          text="Хадгалах"
                          name="save"
                          clickHandle={updateSave}
                          addIcon={<i className="fas fa-share"></i>}
                          btnClass={` btn-success btn-sm 
                          `}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBoby>
          </ColDiv>
        </ColDiv>
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
    about: state.aboutReducer.about,
    error: state.aboutReducer.error,
    updateAbout: state.aboutReducer.updateAbout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // removePhotos: () => dispatch(allRemove()),
    // saveInit: () => dispatch(actions.saveInit()),
    // saveAbout: (data) => dispatch(actions.saveAbout(data)),
    updateAbout: (id, data) => dispatch(actions.updateAbout(id, data)),
    loadAbout: () => dispatch(actions.loadAbout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
