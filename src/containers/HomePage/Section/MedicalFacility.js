import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedialFacility.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/images/co-xuong-khop.jpg";

class MedicalFacility extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <>
        <section className="section-medical-facility">
          <div className="section-container container">
            <div className="section-title">
              <h1>Cơ sở y tế nổi bật</h1>
              <button>Tìm kiếm</button>
            </div>
            <div className="section-content">
              <Slider {...settings}>
                <div className="slide-item">
                  <img src={specialtyImg} />
                  <h3>Bệnh viện hữu nghị Việt Đức</h3>
                </div>
                <div className="slide-item">
                  <img src={specialtyImg} />
                  <h3>Bệnh viện Chợ Rẫy</h3>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
