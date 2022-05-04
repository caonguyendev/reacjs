import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/images/co-xuong-khop.jpg";

class Specialty extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    console.log("check props", this.props);
    return (
      <>
        <section className="section-specialty">
          <div className="section-container container">
            <div className="section-title">
              <h1>Chuyên khoa phổ biến</h1>
              <button>Xem thêm</button>
            </div>
            <div className="section-content">
              <Slider {...settings}>
                <div className="slide-item">
                  <img src={specialtyImg} />
                  <h3>Cơ xương khớp</h3>
                </div>
                <div className="slide-item">
                  <img src={specialtyImg} />
                  <h3>Cơ xương khớp</h3>
                </div>
                <div className="slide-item">
                  <img src={specialtyImg} />
                  <h3>Cơ xương khớp</h3>
                </div>
                <div className="slide-item">
                  <img src={specialtyImg} />
                  <h3>Cơ xương khớp</h3>
                </div>
                <div className="slide-item">
                  <img src={specialtyImg} />
                  <h3>Cơ xương khớp</h3>
                </div>
                <div className="slide-item">
                  <img src={specialtyImg} />
                  <h3>6</h3>
                </div>
              </Slider>
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  // return ();
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
