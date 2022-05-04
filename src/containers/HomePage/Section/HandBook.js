import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "./HandBook.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/images/co-xuong-khop.jpg";

class HandBook extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
    console.log("check props", this.props);
    return (
      <>
        <section className="section-handbook">
          <div className="section-container container">
            <div className="section-title">
              <h1>Cẩm nang</h1>
              <button>Tất cả bài viết</button>
            </div>
            <div className="section-content">
              <Slider {...settings}>
                <div className="slide-item">
                  <img src={specialtyImg} />
                  <h2>
                    Sau cắt bao quy đầu: Chăm sóc thế nào để nhanh lành vết
                    khâu? Bao lâu cần tái khám?
                  </h2>
                </div>
                <div className="slide-item">
                  <img src={specialtyImg} />
                  <h2>
                    Sau cắt bao quy đầu: Chăm sóc thế nào để nhanh lành vết
                    khâu? Bao lâu cần tái khám?
                  </h2>
                </div>
                <div className="slide-item">
                  <img src={specialtyImg} />
                  <h2>
                    Sau cắt bao quy đầu: Chăm sóc thế nào để nhanh lành vết
                    khâu? Bao lâu cần tái khám?
                  </h2>
                </div>
                <div className="slide-item">
                  <img src={specialtyImg} />
                  <h2>
                    Sau cắt bao quy đầu: Chăm sóc thế nào để nhanh lành vết
                    khâu? Bao lâu cần tái khám?
                  </h2>
                </div>
                <div className="slide-item">
                  <img src={specialtyImg} />
                  <h2>
                    Sau cắt bao quy đầu: Chăm sóc thế nào để nhanh lành vết
                    khâu? Bao lâu cần tái khám?
                  </h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
