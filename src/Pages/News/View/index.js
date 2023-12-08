import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CardBoby from "../../../Components/General/CardBody";
import ColDiv from "../../../Components/General/ColDiv";
import Section from "../../../Components/General/Section";
import PageTitle from "../../../Components/PageTitle";
import * as actions from "../../../redux/actions/newsActions";
import ReactHtmlParser from "react-html-parser";
import css from "./__.module.css";
import Spinner from "../../../Components/General/Spinner";
import Spinner2 from "../../../Components/General/Spinner2";
import Button from "../../../Components/General/Button";
import { Link } from "react-router-dom";
import base from "../../../base";
const View = (props) => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    props.loadNews(props.match.params.id);
  }, []);

  useEffect(() => {
    if (props.news !== null) {
      setImages(props.news.pictures);
      setCategories(props.news.categories);
    }
  }, [props.news]);

  return (
    <Section>
      <PageTitle name="Нийтлэл" />
      <ColDiv Allcss="row">
        <ColDiv Allcss="col-md-12">
          {props.loading && <Spinner />}
          {!props.news ? (
            <p>Мэдээлэл олдсонгүй</p>
          ) : (
            <ColDiv Allcss="row">
              <ColDiv Allcss="col-md-3">
                <CardBoby>
                  <div className="card-header">
                    <h3 className="card-title">Нийтлийн зураг</h3>
                  </div>
                  <div className={css.Images}>
                    {images &&
                      images.map((el) => (
                        <img
                          src={`${base.cdnUrl}uploads/${el}`}
                          className={css.Image}
                        />
                      ))}
                  </div>
                </CardBoby>
              </ColDiv>
              <ColDiv Allcss="col-md-9">
                <CardBoby>
                  <div className="card-header">
                    <h3 className="card-title">
                      Нийтлийн дэлгэрэнгүй
                      <span className={css.Status}>
                        {props.news.status === true ? "Идэвхтэй" : "Ноорог"}
                      </span>
                    </h3>
                  </div>
                  <div className={css.DetailsNews}>
                    <h5 className={css.Title}> Гарчиг: {props.news.name} </h5>
                  </div>
                  <div className={css.DetailsNews}>
                    {ReactHtmlParser(props.news.details)}
                  </div>
                  <div className={`row`}>
                    <div className={`col-md-4`}>
                      <div className={css.Categories}>
                        <p className={css.SubTitle}> Ангилал: </p>
                        {categories &&
                          categories.map((el) => (
                            <Link to="/news-category"> {el.name} </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className={css.ControlBtns}>
                    <Button
                      text="Буцах"
                      name="draft"
                      clickHandle={() => props.history.goBack()}
                      btnClass={` btn-default btn-sm `}
                    />
                    <a
                      href={`/news/${props.news.slug}`}
                      className={`btn btn-success btn-sm `}
                      target="_blank"
                    >
                      Нийтлэлруу очих
                    </a>
                  </div>
                </CardBoby>
              </ColDiv>
            </ColDiv>
          )}
        </ColDiv>
      </ColDiv>
    </Section>
  );
};

const mapStateToProps = (state) => {
  return {
    news: state.newsReducer.singleNews.news,
    loading: state.newsReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadNews: (id) => dispatch(actions.getNews(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
