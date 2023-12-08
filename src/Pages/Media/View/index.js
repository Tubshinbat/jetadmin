import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CardBoby from "../../../Components/General/CardBody";
import ColDiv from "../../../Components/General/ColDiv";
import Section from "../../../Components/General/Section";
import PageTitle from "../../../Components/PageTitle";
import * as actions from "../../../redux/actions/mediaActions";
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
    props.loadMedia(props.match.params.id);
  }, []);

  useEffect(() => {
    if (props.media !== null) {
      setImages(props.media.pictures);
      setCategories(props.media.categories);
    }
  }, [props.media]);

  return (
    <Section>
      <PageTitle name="Нийтлэл" />
      <ColDiv Allcss="row">
        <ColDiv Allcss="col-md-12">
          {props.loading && <Spinner />}
          {!props.media ? (
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
                        {props.media.status === true ? "Идэвхтэй" : "Ноорог"}
                      </span>
                    </h3>
                  </div>
                  <div className={css.DetailsMedia}>
                    <h5 className={css.Title}> Гарчиг: {props.media.name} </h5>
                  </div>
                  <div className={css.DetailsMedia}>
                    {ReactHtmlParser(props.media.details)}
                  </div>
                  <div className={`row`}>
                    <div className={`col-md-4`}>
                      <div className={css.Categories}>
                        <p className={css.SubTitle}> Ангилал: </p>
                        {categories &&
                          categories.map((el) => (
                            <Link to="/media-category"> {el.name} </Link>
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
                      href={`/media/${props.media.slug}`}
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
    media: state.mediaReducer.singleMedia.media,
    loading: state.mediaReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMedia: (id) => dispatch(actions.getMedia(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
