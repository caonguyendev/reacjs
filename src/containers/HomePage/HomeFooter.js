import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HomeFooter.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../../assets/images/logo.svg";
import bocongthuong from "../../assets/images/bo-cong-thuong.svg";

class HomeFooter extends Component {
  render() {
    console.log("check props", this.props);
    return (
      <>
        <div className="home-footer">
          <div className="container">
            <div className="footer-row">
              <div className="footer-col1">
                <a className="logo">
                  <img src={logo} />
                </a>
                <h5>Công ty Cổ phần Công nghệ BookingCare</h5>
                <div>
                  <i className="fas fa-map-marker-alt"></i>
                  <span> 28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</span>
                </div>
                <div>
                  <i className="fas fa-check"></i>
                  <span>
                    {" "}
                    ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
                  </span>
                </div>
                <a className="bocongthuong">
                  <img src={bocongthuong} />
                </a>
                <a className="bocongthuong">
                  <img src={bocongthuong} />
                </a>
              </div>
              <div className="footer-col2">
                <div className="list">
                  <a>Liên hệ hợp tác</a>
                  <a>Câu hỏi thường gặp</a>
                  <a>Điều khoản sử dụng</a>
                  <a>Chính sách Bảo mật</a>
                  <a>Quy trình hỗ trợ giải quyết khiếu nại</a>
                  <a>Quy chế hoạt động</a>
                </div>
              </div>
              <div className="footer-col3">
                <div className="item">
                  <h5>Trụ sở tại Hà Nội</h5>
                  <p>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</p>
                </div>
                <div className="item">
                  <h5>Trụ sở tại Hà Nội</h5>
                  <p>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</p>
                </div>
                <div className="item">
                  <h5>Trụ sở tại Hà Nội</h5>
                  <p>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
