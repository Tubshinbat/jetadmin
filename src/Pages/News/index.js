import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, Input, Select, Table, Tag, Space, Tooltip } from "antd";
import { connect } from "react-redux";
import Highlighter from "react-highlight-words";
import moment from "moment";
import * as XLSX from "xlsx";
import { SearchOutlined } from "@ant-design/icons";
import { useCookies } from "react-cookie";

//Lib
import base from "../../base";

//Components
import PageTitle from "../../Components/PageTitle";
import Menus from "./menu";
import axios from "../../axios-base";
import { toastControl } from "../../lib/toasControl";
import Loader from "../../Components/Generals/Loader";

// Actions
import * as actions from "../../redux/actions/newsActions";
import { loadNewsCategories } from "../../redux/actions/newsCategoryActions";

const News = (props) => {
  const [cookies] = useCookies(["language"]);
  const searchInput = useRef(null);
  //STATES
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { Option } = Select;
  const [loading, setLoading] = useState({
    visible: false,
    message: "",
  });
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  // -- FILTER STATE
  const [querys, setQuerys] = useState({});
  const [filterdColumns, setFilterdColumns] = useState([]);
  // -- TABLE STATE
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
    },
  });

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Хайлт хийх`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Хайх
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, selectedKeys, dataIndex)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Шинчлэх
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const [columns, setColumns] = useState([
    {
      dataIndex: "status",
      key: "status",
      title: "Төлөв",
      status: true,

      filters: [
        {
          text: "Нийтлэгдсэн",
          value: "true",
        },
        {
          text: "Ноорог",
          value: "false",
        },
      ],
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "star",
      key: "star",
      title: "Онцлох",
      status: true,

      filters: [
        {
          text: "Онцгойлсон",
          value: "true",
        },
        {
          text: "Онцгой биш",
          value: "false",
        },
      ],
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Гарчиг",
      status: true,
      ...getColumnSearchProps("name"),

      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "type",
      key: "type",
      title: "Нийтлэлийн төрөл",
      status: true,

      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "pictures",
      key: "pictures",
      title: "Зураг",
      status: true,
      render: (text, record) => {
        // console.log(record);
        return (
          <div className="table-image">
            {record.pictures && record.pictures.length > 0 ? (
              <img src={`${base.cdnUrl}150x150/${record.pictures[0]}`} />
            ) : (
              "Зураг оруулаагүй байна"
            )}
          </div>
        );
      },
    },
    {
      dataIndex: "categories",
      key: "categories",
      title: "Ангилал",
      status: true,
      ...getColumnSearchProps("categories"),
      render: (text, record) => {
        return record.categories.map((el) => <Tag color="blue"> {el} </Tag>);
      },
    },
    {
      dataIndex: "views",
      key: "views",
      title: "Нийт үзсэн",
      status: true,
      ...getColumnSearchProps("views"),
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "createUser",
      key: "createUser",
      title: "Бүртгэсэн",
      status: true,
      ...getColumnSearchProps("createUser"),
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "updateUser",
      key: "updateUser",
      title: "Өөрчлөлт хийсэн",
      status: false,
      ...getColumnSearchProps("updateUser"),
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "createAt",
      key: "createAt",
      title: "Үүсгэсэн огноо",
      status: true,
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "updateAt",
      key: "updateAt",
      title: "Өөрчлөлт хийсэн огноо",
      status: false,
      sorter: (a, b) => handleSort(),
    },
  ]);

  const [cloneColumns, setCloneColumns] = useState(columns);

  const handleEdit = () => {
    if (selectedRowKeys.length != 1) {
      toastControl("error", "Нэг өгөгдөл сонгоно уу");
    } else {
      history.push(`/news/edit/${selectedRowKeys[0]}`);
    }
  };

  const handleDelete = () => {
    props.deleteMultNews(selectedRowKeys);
  };

  // -- MODAL STATE
  const [visible, setVisible] = useState({
    delete: false,
    column: false,
  });

  // -- TOAST CONTROL SUCCESS AND ERROR
  useEffect(() => {
    if (props.error) {
      toastControl("error", props.error);
      props.clear();
    }
    if (error) {
      toastControl("error", error);
      props.clear();
    }
  }, [props.error, error]);

  useEffect(() => {
    if (props.success !== null) {
      toastControl("success", props.success);
      handleCancel();
      props.clear();
      setSelectedRowKeys([]);
      init();
    }
  }, [props.success]);

  useEffect(() => {
    init();
  }, [cookies.language]);

  // QUERY CHANGES AND FEATCH DATA
  useEffect(() => {
    if (querys) {
      const query = queryBuild();
      props.loadNews(query);
    }
  }, [querys]);

  // -- SEARCH FILTER AND COLUMNS
  useEffect(() => {
    setFilterdColumns(columns.filter((col) => col.status === true));
  }, [columns]);

  useEffect(() => {
    const select = [];
    select.push(filterdColumns.map((col) => col.dataIndex));
    setQuerys((bquery) => ({ ...bquery, select: select }));
  }, [filterdColumns]);

  // -- LOADING
  useEffect(() => {
    setLoading({ visible: props.loading, message: "Түр хүлээнэ үү" });
  }, [props.loading]);

  // -- NEWS GET DONE EFFECT
  useEffect(() => {
    if (props.allNews) {
      const refData = [];

      props.allNews.length > 0 &&
        props.allNews.map((el) => {
          const key = el._id;
          delete el._id;
          el.status = el.status == true ? "Нийтлэгдсэн" : "Ноорог";
          el.star = el.star == true ? "Онцгойлсон" : "Энгийн";
          el.name = el[cookies.language] ? (
            el[cookies.language].name
          ) : (
            <p className="red-color">
              {el[cookies.language === "eng" ? "mn" : "eng"].name}
            </p>
          );
          el.createUser = el.createUser && el.createUser.name;
          el.updateUser = el.updateUser && el.updateUser.name;
          el.createAt = moment(el.createAt)
            .utcOffset("+0800")
            .format("YYYY-MM-DD HH:mm:ss");
          el.updateAt = moment(el.updateAt)
            .utcOffset("+0800")
            .format("YYYY-MM-DD HH:mm:ss");

          el.categories = el.categories.map((el) =>
            el[cookies.language] ? (
              el[cookies.language].name
            ) : (
              <span className="red-color">
                {el[cookies.language === "eng" ? "mn" : "eng"] &&
                  el[cookies.language === "eng" ? "mn" : "eng"].name}
              </span>
            )
          );

          refData.push({
            dataIndex: key,
            key,
            ...el,
          });
        });
      // console.log(refData);
      setData(refData);
    }
  }, [props.allNews]);

  // Start moment
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const total = props.pagination.total;
    const pageSize = props.pagination.limit;

    setTableParams((tbf) => ({
      ...tbf,
      pagination: { ...tbf.pagination, total, pageSize },
    }));
  }, [props.pagination]);

  // -- INIT
  const init = () => {
    const query = queryBuild();
    props.loadNews(`${query}`);
    props.loadNewsCategories();
  };

  const clear = () => {};

  // -- HANDLE FUNCTIONS

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    setQuerys((bquerys) => ({ ...bquerys, [dataIndex]: selectedKeys[0] }));
  };

  const handleReset = (clearFilters, selectedKeys, dataIndex) => {
    clearFilters();
    setQuerys((bquery) => ({ ...bquery, [dataIndex]: "" }));
    setSearchText("");
  };

  const handleSort = () => {};

  // -- TABLE SELECTED AND CHANGE

  const handleColumn = (e) => {
    const newArr = [...cloneColumns];
    const checkElmt = newArr.findIndex((col) => col.key == e.target.name);
    const toggle = newArr[checkElmt].status === true ? false : true;
    newArr[checkElmt] = { ...newArr[checkElmt], status: toggle };
    setCloneColumns(() => [...newArr]);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination) {
      setQuerys((bq) => ({
        ...bq,
        page: pagination.current,
        limit: pagination.pageSize,
      }));
    }

    if (sorter) {
      const clkey = sorter.columnKey;
      setQuerys((bquery) => ({
        ...bquery,
        sort: `${clkey + ":" + sorter.order}`,
      }));
    } else {
      setQuerys((bquery) => {
        delete bquery.sort;
        return { ...bquery };
      });
    }

    if (filters) {
      // console.log("end");
      Object.keys(filters).map((key) => {
        let str = null;
        if (filters[key]) {
          str = filters[key].toString();
          setQuerys((bq) => ({ ...bq, [key]: str }));
        } else {
          setQuerys((bq) => {
            delete bq[key];
            return { ...bq };
          });
        }
      });
      //
    }
  };

  // Repeat functions
  const queryBuild = () => {
    let query = "";
    Object.keys(querys).map((key) => {
      key !== "select" && (query += `${key}=${querys[key]}&`);
    });
    // if (querys.select && querys.select[0])
    //   query += `select=${
    //     querys &&
    //     querys.select &&
    //     querys.select[0].join(" ").replaceAll(",", " ")
    //   }`;
    return query;
  };

  // -- MODAL SHOW AND CLOSE
  const showModal = (modal) => {
    switch (modal) {
      case "delete": {
        if (selectedRowKeys && selectedRowKeys.length > 0) {
          setVisible((sb) => ({ ...sb, [modal]: true }));
        } else {
          toastControl("error", "Өгөгдөл сонгоно уу");
        }
        break;
      }
      case "edit": {
        if (selectedRowKeys && selectedRowKeys.length === 1) {
          props.history.replace("/news/edit/" + selectedRowKeys[0]);
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

  // -- ROW SELECT FUNCTIONS
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // -- PLUS FUNCTION REFRESH, TO EXCEL, COLUMN
  const refreshTable = () => {
    props.clear();
    setQuerys((bqr) => ({ select: bqr["select"] }));
    setTableParams(() => ({
      ...{
        pagination: {
          current: 1,
        },
      },
    }));
    setSearchText(() => "");
    setSearchedColumn("");
    init();
  };

  const history = useHistory();

  return (
    <>
      <div className="content-wrapper">
        <PageTitle name={`Нийтлэл (${cookies.language})`} />
        <div className="page-sub-menu">
          <Menus />
        </div>
        <div className="content">
          <Loader show={loading.visible}> {loading.message}</Loader>
          <div className="container-fluid">
            <div className="card datatable-card">
              <div className="card-header">
                <h3 className="card-title">Бүх нийтлэл</h3>
              </div>
              <div className="card-body datatable-card-body">
                <div className="datatable-header-tools">
                  <div className="datatable-actions">
                    <button
                      className="datatable-action add-bg"
                      onClick={() => history.push(`/news/add`)}
                    >
                      <i className="fa fa-plus"></i> Нэмэх
                    </button>
                    <button
                      className="datatable-action edit-bg"
                      onClick={() => handleEdit()}
                    >
                      <i className="fa fa-edit"></i> Засах
                    </button>
                    <button
                      className="datatable-action delete-bg"
                      onClick={() => showModal("delete")}
                    >
                      <i className="fa fa-trash"></i> Устгах
                    </button>
                  </div>
                  <div className="datatable-tools">
                    <Tooltip placement="left" title="Шинчлэх">
                      <button
                        className="datatable-tool"
                        onClick={() => refreshTable()}
                      >
                        <i className="fas fa-redo"></i>
                      </button>
                    </Tooltip>

                    <Tooltip placement="left" title="Баганын тохиргоо">
                      <button
                        className="datatable-tool"
                        onClick={() => showModal("column")}
                      >
                        <i className="fas fa-columns"></i>
                      </button>
                    </Tooltip>
                  </div>
                </div>
                <div className="tableBox">
                  <Table
                    rowSelection={rowSelection}
                    columns={filterdColumns}
                    dataSource={data}
                    onChange={handleTableChange}
                    pagination={tableParams.pagination}
                    loading={props.loading}
                    size="small"
                  />
                </div>
                <div className="talbeFooter">
                  Нийт <b> {props.pagination.total} </b> өгөгдөл байна
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal col */}

      <Modal
        visible={visible && visible.column}
        title="Тохиргоо"
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Буцах
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            loading={loading.visible}
            onClick={() => setColumns(cloneColumns)}
          >
            Хадгалах
          </Button>,
        ]}
      >
        <div className="tableBox">
          <table className="custom-table">
            <tr>
              <th>№</th>
              <th>Нэр</th>
              <th>Харагдах эсэх</th>
            </tr>
            {cloneColumns.map((col, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{col.title}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={col.status}
                    name={col.key}
                    onChange={handleColumn.bind()}
                  />{" "}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </Modal>

      {/* Delete modal */}
      {/* DELETE MODAL */}
      <Modal
        visible={visible && visible.delete}
        title="Устгах"
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Буцах
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type="danger"
            loading={loading.visible}
            onClick={() => handleDelete(cloneColumns)}
          >
            Устгах
          </Button>,
        ]}
      >
        <div className="tableBox">
          <p>
            {" "}
            Та нийт <b> {selectedRowKeys.length} </b> мэдээлэл сонгосон байна
            устгахдаа итгэлтэй байна уу? <br /> Хэрэв устгавал дахин сэргээх
            боломжгүйг анхаарна уу.{" "}
          </p>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.newsReducer.loading,
    success: state.newsReducer.success,
    error: state.newsReducer.error,
    allNews: state.newsReducer.allNews,
    pagination: state.newsReducer.paginationLast,
    categories: state.newsCategoryReducer.categories,
    // excelData: state.userReducer.excelData,
    // excelLoading: state.userReducer.excelLoading,
    news: state.newsReducer.news,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    saveNews: (data) => dispatch(actions.saveNews(data)),
    loadNewsCategories: () => dispatch(loadNewsCategories()),
    loadNews: (query) => dispatch(actions.loadNews(query)),
    getNews: (id) => dispatch(actions.getNews(id)),
    deleteMultNews: (ids) => dispatch(actions.deleteMultNews(ids)),
    getExcelData: (query) => dispatch(actions.getExcelData(query)),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(News);
