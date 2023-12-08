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

import * as actions from "../../../../redux/actions/fastlinkActions";

// Lib
import base from "../../../../base";
import axios from "../../../../axios-base";
import { toastControl } from "src/lib/toasControl";

import { convertFromdata } from "../../../../lib/handleFunction";
import TextArea from "antd/lib/input/TextArea";

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
    props.getFastlinks(props.match.params.id);
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
    if (!picture) {
      toastControl("error", "Зураг болон дүрс зураг оруулна уу");
      return;
    }

    if (status === "draft") {
      data.status = false;
    }

    const data = {
      ...values,
      picture: picture.name,
    };

    const sendData = convertFromdata(data);
    props.updateFastlinks(props.match.params.id, sendData);
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
      setTimeout(() => props.history.replace("/fast-links"), 2000);
    }
  }, [props.success]);

  useEffect(() => {
    init();
  }, [cookies.language]);

  useEffect(() => {
    if (props.fastlink) {
      const languageData = {
        name: !props.fastlink[cookies.language]
          ? ""
          : props.fastlink[cookies.language].name,
        about: !props.fastlink[cookies.language]
          ? ""
          : props.fastlink[cookies.language].about,
      };

      form.setFieldsValue({ ...props.fastlink, ...languageData });

      if (props.fastlink.picture) {
        setPicture(() => ({
          name: props.fastlink.picture,
          url: `${base.cdnUrl}/150x150/${props.fastlink.picture}`,
        }));
      }
    }
  }, [props.fastlink]);

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
                          <Form.Item label="Дэлгэрэнгүй" name="about">
                            <TextArea />
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
    success: state.fastlinkReducer.success,
    error: state.fastlinkReducer.error,
    loading: state.fastlinkReducer.loading,
    fastlink: state.fastlinkReducer.fastlink,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    getFastlinks: (id) => dispatch(actions.getFastlinks(id)),
    updateFastlinks: (id, data) => dispatch(actions.updateFastlinks(id, data)),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
