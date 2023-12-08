import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Switch, Tree, Select } from "antd";
import { connect } from "react-redux";

// Actions
import * as actions from "../../../redux/actions/footerMenuActions";

// Components
import Menus from "./../menu";
import { toastControl } from "../../../lib/toasControl";
import Loader from "../../../Components/Generals/Loader";
import { useCookies } from "react-cookie";

const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const SiteFooterMenu = (props) => {
  const [form] = Form.useForm();

  // STATES
  const [gData, setGData] = useState([]);
  const [cookies] = useCookies(["language"]);
  // const [expandedKeys] = useState(["0-0", "0-0-0", "0-0-0-0"]);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState([]);
  const [selectData, setSelectData] = useState(null);
  const [isModel, setIsModel] = useState(false);
  const [isDirect, setIsDirect] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(true);

  const [visible, setVisible] = useState({
    edit: false,
    add: false,
    delete: false,
    parent: false,
  });
  const [isParent, setIsParent] = useState(false);

  const footerMenuGenerateData = (categories) => {
    let datas = [];
    if (categories) {
      categories.map((el) => {
        datas.push({
          title:
            el[cookies.language] && el[cookies.language].name ? (
              el[cookies.language].name
            ) : (
              <span className="red-color">
                {el[cookies.language === "eng" ? "mn" : "eng"] &&
                  el[cookies.language === "eng" ? "mn" : "eng"].name}
              </span>
            ),
          key: el._id,
          children: el.children && footerMenuGenerateData(el.children),
        });
      });
    }

    return datas;
  };

  // USEEFFECTS
  useEffect(() => {
    init();
    return () => {
      clear();
    };
  }, []);

  // --TOAST CONTROL SUCCESS AND ERROR
  useEffect(() => {
    if (props.error) {
      toastControl("error", props.error);
      props.clear();
    }
  }, [props.error]);

  useEffect(() => {
    if (props.success) {
      toastControl("success", props.success);
      init();
      clear();
    }
  }, [props.success]);

  // -- LOADING
  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  // -- FEATCH DATA MENUS
  useEffect(() => {
    const data = footerMenuGenerateData(props.categories);
    setGData(data);
  }, [props.categories]);

  useEffect(() => {
    if (props.category) {
      setSelectData(props.category);
    }
  }, [props.category]);

  useEffect(() => {
    props.loadFooterMenus();
  }, [cookies.language]);

  // FUNCTIONS
  const init = () => {
    props.loadFooterMenus();
    return () => {
      clear();
    };
  };

  const clear = () => {
    props.clear();
    form.resetFields();
    setIsDirect(true);
    setIsModel(false);
  };

  const onDragEnter = (info) => {
    // console.log(info);
    // setExpandedKeys(info.expandedKeys)
  };

  const onDrop = (info) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...gData];

    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (!info.dropToGap) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 &&
      info.node.props.expanded &&
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar = [];
      let i;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    const sendData = {
      data: data,
    };
    props.changePosition(sendData);
    setGData(data);
  };

  const onSelect = (selectKey, element) => {
    setSelect(selectKey);
    if (selectKey.length > 0) {
      props.getFooterMenu(selectKey[0]);
    } else {
      setSelectData(null);
    }
  };

  // -- CRUD FUNCTIONS
  const add = (values) => {
    values.isDirect = isDirect;
    values.isModel = isModel;
    values.status = selectedStatus;
    const data = {
      ...values,
    };

    props.saveFooterMenu(data);
  };

  const addParent = (values) => {
    values.parentId = selectData._id;
    values.isDirect = isDirect;
    values.isModel = isModel;
    values.status = selectedStatus;
    const data = {
      ...values,
    };
    props.saveFooterMenu(data);
  };

  const editFooterMenu = (values) => {
    values.isDirect = isDirect;
    values.isModel = isModel;
    values.status = selectedStatus;
    const data = {
      ...values,
    };

    props.updateFooterMenu(data, select[0]);
    handleCancel();
  };

  const deleteFooterMenu = () => {
    props.deleteFooterMenu(select[0], selectData);
    setSelect([]);
    setSelectData({});
    handleCancel();
  };

  // -- MODAL SHOW AND CLOSE
  const showModal = (modal) => {
    switch (modal) {
      case "delete": {
        if (select && select.length === 1) {
          setVisible((sb) => ({ ...sb, [modal]: true }));
        } else {
          toastControl("error", "Нэг өгөгдөл сонгоно уу");
        }
        break;
      }
      case "parent": {
        if (select && select.length === 1) {
          setVisible((sb) => ({ ...sb, [modal]: true }));
        } else {
          toastControl("error", "Нэг өгөгдөл сонгоно уу");
        }
        break;
      }
      case "edit": {
        if (select && select.length === 1) {
          form.setFieldsValue({
            ...props.category,
            name:
              props.category[cookies.language] &&
              props.category[cookies.language].name,
          });
          setIsDirect(props.category.isDirect);
          setIsModel(props.category.isModel);
          setSelectedStatus(props.category.status);

          setVisible((sb) => ({ ...sb, [modal]: true }));
        } else {
          toastControl("error", "Нэг өгөгдөл сонгоно уу");
        }
        break;
      }
      default: {
        setVisible((sb) => ({ ...sb, [modal]: true }));
        break;
      }
    }
  };

  const handleCancel = () => {
    setVisible((sb) => Object.keys(sb).map((el) => (sb[el] = false)));
    clear();
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="page-sub-footerMenu">
          <Menus />
        </div>
        <div className="content mt-4 ">
          <div className="container-fluid">
            <Loader show={props.loading}> Түр хүлээнэ үү</Loader>
            <div className="row">
              <div className="col-md-12">
                <div className="datatable-header-tools">
                  <div className="datatable-actions">
                    <button
                      className="datatable-action add-bg"
                      onClick={() => showModal("add")}
                    >
                      <i className="fa fa-plus"></i> Цэс нэмэх
                    </button>
                    <button
                      className={`datatable-action add-bg ${
                        select && select.length > 0 && "active"
                      }`}
                      onClick={() => showModal("parent")}
                    >
                      <i className="fa fa-plus"></i> Дэд цэс нэмэх
                    </button>
                    <button
                      className={`datatable-action edit-bg ${
                        select && select.length > 0 && "active"
                      }`}
                      onClick={() => showModal("edit")}
                    >
                      <i className="fa fa-edit"></i> Засах
                    </button>
                    <button
                      className={`datatable-action delete-bg ${
                        select && select.length > 0 && "active"
                      }`}
                      onClick={() => showModal("delete")}
                    >
                      <i className="fa fa-trash"></i> Устгах
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className={`card card-custom`}>
                  <div className="card-body">
                    <h3 className="card-title">
                      СОНГОГДСОН ЦЭС:{" "}
                      {selectData && selectData[cookies.language]
                        ? selectData[cookies.language].name
                        : "---"}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className={`card card-custom`}>
                  <Tree
                    className="draggable-tree tree-style"
                    // defaultExpandedKeys={expandedKeys}
                    draggable
                    blockNode
                    onDragEnter={onDragEnter}
                    onSelect={onSelect}
                    onDrop={onDrop}
                    treeData={gData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add category */}
      <Modal
        visible={visible && visible.add}
        title="Ангилал нэмэх"
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Буцах
          </Button>,
          <Button
            loading={props.loading}
            key="submit"
            htmlType="submit"
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  add(values);
                })
                .catch((info) => {});
            }}
          >
            Нэмэх
          </Button>,
        ]}
      >
        <Form layout="vertical" form={form}>
          <div className="row">
            <div className="col-4">
              <Form.Item label="Идэвхтэй эсэх" name="status">
                <Switch
                  onChange={(value) => setSelectedStatus(value)}
                  checked={selectedStatus}
                />
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item label="Линк холбох" name="isDirect">
                <Switch
                  checked={isDirect}
                  onChange={(value) => {
                    isModel === false
                      ? setIsDirect(value)
                      : toastControl(
                          "error",
                          "Нэг модал, линк хоёрын аль нэгийг сонгоно уу"
                        );
                  }}
                />
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item label="Модал холбох" name="isModel">
                <Switch
                  checked={isModel}
                  onChange={(value) => {
                    isDirect === false
                      ? setIsModel(value)
                      : toastControl(
                          "error",
                          "Нэг модал, линк хоёрын аль нэгийг сонгоно уу"
                        );
                  }}
                />
              </Form.Item>
            </div>

            <div className="col-12">
              <Form.Item label="Цэсний нэр" name="name" rules={[requiredRule]}>
                <Input placeholder="Цэсний нэрийг оруулна уу" />
              </Form.Item>
            </div>
            <div
              className="col-12"
              style={{ display: isDirect == true ? "block" : "none" }}
            >
              <Form.Item
                label="Үсрэх линк"
                name="direct"
                rules={isDirect === true && [requiredRule]}
              >
                <Input placeholder="Холбох линкээ оруулна уу" />
              </Form.Item>
            </div>
            <div
              className="col-12"
              style={{ display: isModel == true ? "block" : "none" }}
            >
              <Form.Item
                label="Модал сонгох"
                name="model"
                rules={isModel === true && [requiredRule]}
              >
                <Select
                  placeholder="Модал сонгох"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "news",
                      label: "Мэдээ мэдээлэл",
                    },
                    {
                      value: "wheels",
                      label: "Обуд",
                    },
                    {
                      value: "tires",
                      label: "Дугуй",
                    },

                    {
                      value: "faqs",
                      label: "Түгээмэл асуулт",
                    },

                    {
                      value: "services",
                      label: "Үйлчилгээ",
                    },

                    {
                      value: "contacts",
                      label: "Холбоо барих",
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
      {/* Parent category */}
      <Modal
        visible={visible && visible.parent}
        title="Дэд ангилал нэмэх"
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Буцах
          </Button>,
          <Button
            loading={props.loading}
            key="submit"
            htmlType="submit"
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  addParent(values);
                })
                .catch((info) => {});
            }}
          >
            Нэмэх
          </Button>,
        ]}
      >
        <Form layout="vertical" form={form}>
          <div className="row">
            <div className="col-4">
              <Form.Item label="Идэвхтэй эсэх" name="status">
                <Switch
                  onChange={(value) => setSelectedStatus(value)}
                  checked={selectedStatus}
                />
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item label="Линк холбох" name="isDirect">
                <Switch
                  checked={isDirect}
                  onChange={(value) => {
                    isModel === false
                      ? setIsDirect(value)
                      : toastControl(
                          "error",
                          "Нэг модал, линк хоёрын аль нэгийг сонгоно уу"
                        );
                  }}
                />
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item label="Модал холбох" name="isModel">
                <Switch
                  checked={isModel}
                  onChange={(value) => {
                    isDirect === false
                      ? setIsModel(value)
                      : toastControl(
                          "error",
                          "Нэг модал, линк хоёрын аль нэгийг сонгоно уу"
                        );
                  }}
                />
              </Form.Item>
            </div>

            <div className="col-12">
              <Form.Item
                label="Дэд ангилалын нэр"
                name="name"
                rules={[requiredRule]}
              >
                <Input placeholder="Дэд ангилалын нэрийг оруулна уу" />
              </Form.Item>
            </div>
            <div
              className="col-12"
              style={{ display: isDirect == true ? "block" : "none" }}
            >
              <Form.Item
                label="Үсрэх линк"
                name="direct"
                rules={isDirect === true && [requiredRule]}
              >
                <Input placeholder="Холбох линкээ оруулна уу" />
              </Form.Item>
            </div>
            <div
              className="col-12"
              style={{ display: isModel == true ? "block" : "none" }}
            >
              <Form.Item
                label="Модал сонгох"
                name="model"
                rules={isModel === true && [requiredRule]}
              >
                <Select
                  placeholder="Модал сонгох"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "news",
                      label: "Мэдээ мэдээлэл",
                    },
                    {
                      value: "announce",
                      label: "Зарлал",
                    },
                    {
                      value: "platforms",
                      label: "Платформ",
                    },
                    {
                      value: "services",
                      label: "Үйлчилгээ",
                    },
                    {
                      value: "costs",
                      label: "Үнийн мэдээлэл",
                    },
                    {
                      value: "partners",
                      label: "Хамтрагчид",
                    },
                    {
                      value: "faq",
                      label: "Түгээмэл асуулт",
                    },
                    {
                      value: "gallerys",
                      label: "Зургийн цомог",
                    },
                    {
                      value: "contacts",
                      label: "Холбоо барих",
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
      {/* Edit Category */}
      <Modal
        visible={visible && visible.edit}
        title="Ангилал засах"
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Буцах
          </Button>,
          <Button
            loading={props.loading}
            key="submit"
            htmlType="submit"
            type="primary"
            onClick={() =>
              form
                .validateFields()
                .then((values) => {
                  editFooterMenu(values);
                })
                .catch((info) => console.log(info))
            }
          >
            Хадгалах{" "}
          </Button>,
        ]}
      >
        <Form layout="vertical" form={form}>
          <div className="row">
            <div className="col-4">
              <Form.Item label="Идэвхтэй эсэх" name="status">
                <Switch
                  onChange={(value) => setSelectedStatus(value)}
                  checked={selectedStatus}
                />
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item label="Линк холбох" name="isDirect">
                <Switch
                  checked={isDirect}
                  onChange={(value) => {
                    isModel === false
                      ? setIsDirect(value)
                      : toastControl(
                          "error",
                          "Нэг модал, линк хоёрын аль нэгийг сонгоно уу"
                        );
                  }}
                />
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item label="Модал холбох" name="isModel">
                <Switch
                  checked={isModel}
                  onChange={(value) => {
                    isDirect === false
                      ? setIsModel(value)
                      : toastControl(
                          "error",
                          "Нэг модал, линк хоёрын аль нэгийг сонгоно уу"
                        );
                  }}
                />
              </Form.Item>
            </div>

            <div className="col-12">
              <Form.Item label="Цэсний нэр" name="name" rules={[requiredRule]}>
                <Input placeholder="Цэсний нэрийг оруулна уу" />
              </Form.Item>
            </div>
            <div
              className="col-12"
              style={{ display: isDirect == true ? "block" : "none" }}
            >
              <Form.Item
                label="Үсрэх линк"
                name="direct"
                rules={isDirect === true && [requiredRule]}
              >
                <Input placeholder="Холбох линкээ оруулна уу" />
              </Form.Item>
            </div>
            <div
              className="col-12"
              style={{ display: isModel == true ? "block" : "none" }}
            >
              <Form.Item
                label="Модал сонгох"
                name="model"
                rules={isModel === true && [requiredRule]}
              >
                <Select
                  placeholder="Модал сонгох"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "news",
                      label: "Мэдээ мэдээлэл",
                    },
                    {
                      value: "announce",
                      label: "Зарлал",
                    },
                    {
                      value: "platforms",
                      label: "Платформ",
                    },
                    {
                      value: "services",
                      label: "Үйлчилгээ",
                    },
                    {
                      value: "costs",
                      label: "Үнийн мэдээлэл",
                    },
                    {
                      value: "partners",
                      label: "Хамтрагчид",
                    },
                    {
                      value: "faq",
                      label: "Түгээмэл асуулт",
                    },
                    {
                      value: "gallerys",
                      label: "Зургийн цомог",
                    },
                    {
                      value: "contacts",
                      label: "Холбоо барих",
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
      <Modal
        visible={visible && visible.delete}
        title="Устгах"
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Буцах
          </Button>,
          <Button
            loading={props.loading}
            key="submit"
            htmlType="submit"
            type="danger"
            onClick={() => deleteFooterMenu()}
          >
            Устгах
          </Button>,
        ]}
      >
        <p>
          Та <b> {selectData && selectData.name} </b> - ангилалыг устгахдаа
          итгэлтэй байна уу?{" "}
        </p>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    success: state.footerMenuReducer.success,
    error: state.footerMenuReducer.error,
    loading: state.footerMenuReducer.loading,
    categories: state.footerMenuReducer.footerMenus,
    category: state.footerMenuReducer.footerMenu,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    saveFooterMenu: (data) => dispatch(actions.saveFooterMenu(data)),
    loadFooterMenus: () => dispatch(actions.loadFooterMenus()),
    getFooterMenu: (id) => dispatch(actions.getFooterMenu(id)),
    changePosition: (data) => dispatch(actions.changePosition(data)),
    updateFooterMenu: (data, id) =>
      dispatch(actions.updateFooterMenu(data, id)),
    deleteFooterMenu: (id) => dispatch(actions.deleteFooterMenu(id)),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(SiteFooterMenu);