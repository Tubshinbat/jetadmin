import React, { useEffect, useState } from "react";
import { Form, Input, Button, Switch, Upload, message } from "antd";
import { connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { useCookies } from "react-cookie";

//Components
import PageTitle from "../../../../Components/PageTitle";
import { InboxOutlined } from "@ant-design/icons";
import Loader from "../../../../Components/Generals/Loader";

//Actions
import { tinymceAddPhoto } from "../../../../redux/actions/imageActions";

import * as actions from "../../../../redux/actions/toplinkActions";

// Lib
import base from "../../../../base";
import axios from "../../../../axios-base";
import { toastControl } from "src/lib/toasControl";

import { convertFromdata } from "../../../../lib/handleFunction";

const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const { Dragger } = Upload;

const Add = (props) => {
  const [form] = Form.useForm();
  const [cookies] = useCookies(["language"]);
  const [picture, setPicture] = useState(null);
  const [icon, setIcon] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState({
    visible: false,
    message: "",
  });

  // FUNCTIONS
  const init = () => {
    props.getToplinks(props.match.params.id);
  };

  const clear = () => {
    props.clear();
    form.resetFields();
    setPicture(null);
    setIcon(null);
    setLoading(false);
  };

  const handleChange = (event) => {
    form.setFieldsValue({ about: event });
  };

  const handleEdit = (values, status = null) => {
    if (!icon || !picture) {
      toastControl("error", "Зураг болон дүрс зураг оруулна уу");
      return;
    }

    if (status === "draft") {
      data.status = false;
    }

    const data = {
      ...values,
      icon: icon.name,
      picture: picture.name,
    };

    const sendData = convertFromdata(data);
    props.updateToplink(props.match.params.id, sendData);
  };

  const handleRemove = (stType, file) => {
    let deleteFile;

    switch (stType) {
      case "picture": {
        deleteFile = picture.name;
        setPicture(null);
        break;
      }
      case "icon": {
        deleteFile = icon.name;
        setIcon(null);
        break;
      }
      default:
        break;
    }
  };

  // CONFIGS
  const uploadIconImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };

    fmData.append("file", file);
    try {
      const res = await axios.post("/imgupload", fmData, config);
      const img = {
        name: res.data.data,
        url: `${base.cdnUrl}${res.data.data}`,
      };

      setIcon((bp) => {
        if (bp && bp.name) {
          axios.delete("/imgupload", { data: { file: bp.name } });
        }
        return img;
      });
      onSuccess("Ok");
      message.success(res.data.data + " Хуулагдлаа");
      return img;
    } catch (err) {
      toastControl("error", err);
      onError({ err });
      return false;
    }
  };

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };

    fmData.append("file", file);
    try {
      const res = await axios.post("/imgupload", fmData, config);
      const img = {
        name: res.data.data,
        url: `${base.cdnUrl}${res.data.data}`,
      };

      setPicture((bp) => {
        if (bp && bp.name) {
          axios.delete("/imgupload", { data: { file: bp.name } });
        }
        return img;
      });
      onSuccess("Ok");
      message.success(res.data.data + " Хуулагдлаа");
      return img;
    } catch (err) {
      toastControl("error", err);
      onError({ err });
      return false;
    }
  };

  const uploadOptions = {
    onRemove: (file) => handleRemove("picture", file),
    fileList: picture && picture.name && [picture],
    customRequest: uploadImage,
    accept: "image/*",
    name: "picture",
    maxCount: 1,
    listType: "picture",
  };

  const uploadIconOptions = {
    onRemove: (file) => handleRemove("icon", file),
    fileList: icon && icon.name && [icon],
    customRequest: uploadIconImage,
    accept: "image/*",
    name: "icon",
    maxCount: 1,
    listType: "picture",
  };

  // USEEFFECT
  useEffect(() => {
    init();
    return () => clear();
  }, []);

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
  useEffect(() => {
    toastControl("error", props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.success) {
      toastControl("success", props.success);
      setTimeout(() => props.history.replace("/top-links"), 2000);
    }
  }, [props.success]);

  useEffect(() => {
    init();
  }, [cookies.language]);

  useEffect(() => {
    if (props.toplink) {
      const languageData = {
        name: !props.toplink[cookies.language]
          ? ""
          : props.toplink[cookies.language].name,
        about: !props.toplink[cookies.language]
          ? ""
          : props.toplink[cookies.language].about,
      };

      form.setFieldsValue({ ...props.toplink, ...languageData });

      if (props.toplink.picture) {
        setPicture(() => ({
          name: props.toplink.picture,
          url: `${base.cdnUrl}/150x150/${props.toplink.picture}`,
        }));
      }
      if (props.toplink.icon) {
        setIcon(() => ({
          name: props.toplink.icon,
          url: `${base.cdnUrl}/150x150/${props.toplink.icon}`,
        }));
      }
    }
  }, [props.toplink]);

  return (
    <>
      <div className="content-wrapper">
        <PageTitle name={`Цэс шинэчлэх (${cookies.language})`} />
        <div className="page-sub-menu"></div>
        <div className="content">
          <Loader show={loading.visible}> {loading.message} </Loader>
          <div className="container-fluid">
            <Form layout="vertical" form={form}>
              <div className="row">
                <div className="col-8">
                  <div className="card card-primary">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <Form.Item
                            label="Цэсний нэр"
                            name="name"
                            rules={[requiredRule]}
                            hasFeedback
                          >
                            <Input placeholder="Цэсний нэр оруулна уу" />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <Form.Item label="Холбоос" name="direct" hasFeedback>
                            <Input placeholder="Холбоос оруулна уу" />
                          </Form.Item>
                        </div>

                        <div className="col-12">
                          <Form.Item
                            label="Дэлгэрэнгүй"
                            name="about"
                            getValueFromEvent={(e) =>
                              e.target && e.target.getContent()
                            }
                          >
                            <Editor
                              apiKey="2nubq7tdhudthiy6wfb88xgs36os4z3f4tbtscdayg10vo1o"
                              init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                  "advlist textcolor autolink lists link image charmap print preview anchor tinydrive ",
                                  "searchreplace visualblocks code fullscreen",
                                  "insertdatetime media table paste code help wordcount image media  code  table  ",
                                ],
                                toolbar:
                                  "mybutton | addPdf |  image | undo redo | fontselect fontsizeselect formatselect blockquote  | bold italic forecolor  backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help | link  | quickbars | media | code | tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
                                file_picker_types: "image",
                                tinydrive_token_provider: `${base.apiUrl}users/jwt`,
                                automatic_uploads: false,
                                setup: (editor) => {
                                  editor.ui.registry.addButton("mybutton", {
                                    text: "Файл оруулах",
                                    onAction: () => {
                                      var input =
                                        document.createElement("input");
                                      input.setAttribute("type", "file");
                                      input.onchange = async function () {
                                        var file = this.files[0];
                                        const fData = new FormData();
                                        fData.append("file", file);
                                        setLoading({
                                          visible: true,
                                          message:
                                            "Түр хүлээнэ үү файл хуулж байна",
                                        });
                                        const res = await axios.post(
                                          "/file",
                                          fData
                                        );
                                        const url =
                                          `${base.cdnUrl}` + res.data.data;
                                        editor.insertContent(
                                          `<a href="${url}"> ${res.data.data} </a>`
                                        );
                                        setLoading({
                                          visible: false,
                                        });
                                      };
                                      input.click();
                                    },
                                  });
                                  editor.ui.registry.addButton("addPdf", {
                                    text: "PDF Файл оруулах",
                                    onAction: () => {
                                      let input =
                                        document.createElement("input");
                                      input.setAttribute("type", "file");
                                      input.setAttribute("accept", ".pdf");
                                      input.onchange = async function () {
                                        let file = this.files[0];
                                        const fData = new FormData();
                                        fData.append("file", file);
                                        setLoading({
                                          visible: true,
                                          message:
                                            "Түр хүлээнэ үү файл хуулж байна",
                                        });
                                        const res = await axios.post(
                                          "/file",
                                          fData
                                        );
                                        const url = base.cdnUrl + res.data.data;
                                        editor.insertContent(
                                          `<iframe src="${url}" style="width:100%; min-height: 500px"> </iframe>`
                                        );
                                        setLoading({
                                          visible: false,
                                        });
                                      };
                                      input.click();
                                    },
                                  });
                                },
                                file_picker_callback: function (
                                  cb,
                                  value,
                                  meta
                                ) {
                                  var input = document.createElement("input");
                                  input.setAttribute("type", "file");
                                  input.setAttribute("accept", "image/*");
                                  input.onchange = async function () {
                                    var file = this.files[0];
                                    const fData = new FormData();
                                    fData.append("file", file);
                                    const res = await axios.post(
                                      "/imgupload",
                                      fData
                                    );
                                    const url =
                                      `${base.cdnUrl}` + res.data.data;
                                    cb(url);
                                  };
                                  input.click();
                                },
                              }}
                              onEditorChange={(event) => handleChange(event)}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card">
                    <div class="card-header">
                      <h3 class="card-title">ТОХИРГОО</h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <Form.Item label="Идэвхтэй эсэх" name="status">
                            <Switch
                              checkedChildren="Идэвхтэй"
                              unCheckedChildren="Идэвхгүй"
                              size="medium"
                              defaultChecked
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="control-bottons">
                        <Button
                          key="submit"
                          htmlType="submit"
                          className="add-button"
                          loading={props.loading}
                          onClick={() => {
                            form
                              .validateFields()
                              .then((values) => {
                                handleEdit(values);
                              })
                              .catch((info) => {
                                // console.log(info);
                              });
                          }}
                        >
                          Нийтлэх
                        </Button>
                        <Button
                          key="draft"
                          type="primary"
                          onClick={() => {
                            form
                              .validateFields()
                              .then((values) => {
                                handleEdit(values, "draft");
                              })
                              .catch((info) => {
                                // console.log(info);
                              });
                          }}
                        >
                          Ноороглох
                        </Button>
                        <Button onClick={() => props.history.goBack()}>
                          Буцах
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div class="card-header">
                      <h3 class="card-title">Ар талын зураг</h3>
                    </div>
                    <div className="card-body">
                      <Dragger
                        {...uploadOptions}
                        className="upload-list-inline"
                      >
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                          Зургаа энэ хэсэг рүү чирч оруулна уу
                        </p>
                        <p className="ant-upload-hint">
                          Нэг болон түүнээс дээш файл хуулах боломжтой
                        </p>
                      </Dragger>
                    </div>
                  </div>

                  <div className="card">
                    <div class="card-header">
                      <h3 class="card-title">Дүрс</h3>
                    </div>
                    <div className="card-body">
                      <Dragger
                        {...uploadIconOptions}
                        className="upload-list-inline"
                      >
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                          Зургаа энэ хэсэг рүү чирч оруулна уу
                        </p>
                        <p className="ant-upload-hint">
                          Нэг болон түүнээс дээш файл хуулах боломжтой
                        </p>
                      </Dragger>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    success: state.toplinkReducer.success,
    error: state.toplinkReducer.error,
    loading: state.toplinkReducer.loading,
    toplink: state.toplinkReducer.toplink,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    getToplinks: (id) => dispatch(actions.getToplinks(id)),

    updateToplink: (id, data) => dispatch(actions.updateToplinks(id, data)),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
