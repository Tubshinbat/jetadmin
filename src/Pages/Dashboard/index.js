import React, { useEffect } from "react";
import { connect } from "react-redux";

// Components
import PageTitle from "../../Components/PageTitle";

// Actions
import { getCountNews, loadNews } from "../../redux/actions/newsActions";
import { getCountUser } from "../../redux/actions/userActions";
import { getCountMenu } from "../../redux/actions/menuActions";
import { getCountPage } from "../../redux/actions/pageActions";

const Dashboard = (props) => {
  const init = () => {
    props.getCountUser();
    props.getCountNews();
    props.getCountMenu();
    props.getCountPage();
  };
  const clear = () => {};
  // UseEffect's

  useEffect(() => {
    init();
    return () => {
      clear();
    };
  }, []);

  return (
    <>
      <div className="content-wrapper">
        <PageTitle name="Хянах самбар" />
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="count-box bg-info">
                  <div className="inner">
                    <h3>{props.pageTotal}</h3>
                    <p>Сайтын хуудас</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-question"></i>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="count-box tile-green">
                  <div className="inner">
                    <h3>{props.userTotal}</h3>
                    <p>Нийт Хэрэглэгчид</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-users"></i>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="count-box tile-aqua">
                  <div className="inner">
                    <h3>{props.newsTotal}</h3>
                    <p>Нийт контент</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-newspaper"></i>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="count-box tile-aqua">
                  <div className="inner">
                    <h3>{props.menuTotal}</h3>
                    <p>Нийт цэс</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-book"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userTotal: state.userReducer.totalCount,
    newsTotal: state.newsReducer.totalCount,
    menuTotal: state.menuReducer.totalCount,
    pageTotal: state.pageReducer.totalCount,
    users: state.userReducer.users,
    news: state.newsReducer.allNews,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    getCountUser: () => dispatch(getCountUser()),
    getCountNews: () => dispatch(getCountNews()),
    getCountMenu: () => dispatch(getCountMenu()),
    getCountPage: () => dispatch(getCountPage()),
    loadNews: (query) => dispatch(loadNews(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Dashboard);
