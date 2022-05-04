import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";
import { toUpper } from "lodash";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    // fire redux event : actions
    this.props.changeLanguageAppRedux(language);
  };

  returnToHomePage = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };

  render() {
    console.log("check props", this.props);
    let language = this.props.language;
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content container">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div
                className="header-logo"
                onClick={() => {
                  this.returnToHomePage();
                }}
              ></div>
            </div>
            <div className="center-content">
              <div className="list">
                <div className="item">
                  <div className="title">
                    <FormattedMessage id="homeheader.speciality" />
                  </div>
                  <div className="desc">
                    <FormattedMessage id="homeheader.searchdoctor" />
                  </div>
                </div>
                <div className="item">
                  <div className="title">
                    <FormattedMessage id="homeheader.health-facility" />
                  </div>
                  <div className="desc">
                    <FormattedMessage id="homeheader.select-room" />
                  </div>
                </div>
                <div className="item">
                  <div className="title">
                    {" "}
                    <FormattedMessage id="homeheader.doctor" />
                  </div>
                  <div className="desc">
                    <FormattedMessage id="homeheader.select-doctor" />
                  </div>
                </div>
                <div className="item">
                  <div className="title">
                    <FormattedMessage id="homeheader.fee" />
                  </div>
                  <div className="desc">
                    <FormattedMessage id="homeheader.check-health" />
                  </div>
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <a className="support-link">
                  <span className="icon">?</span>
                  <span className="text">
                    <FormattedMessage id="homeheader.support" />
                  </span>
                </a>
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="banner-top">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="input-search">
                <i className="fas fa-search"></i>
                <input type="text" className="" placeholder="Tìm phòng khám" />
              </div>
            </div>
            <div className="banner-bottom">
              <div className="banner-bottom-list container">
                <div className="banner-bottom-item">
                  <div className="banner-bottom-icon">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="banner-bottom-text">
                    <FormattedMessage id="banner.item1" />
                  </div>
                </div>
                <div className="banner-bottom-item">
                  <div className="banner-bottom-icon">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="banner-bottom-text">
                    <FormattedMessage id="banner.item2" />
                  </div>
                </div>
                <div className="banner-bottom-item">
                  <div className="banner-bottom-icon">
                    <i className="fas fa-procedures"></i>
                  </div>
                  <div className="banner-bottom-text">
                    <FormattedMessage id="banner.item3" />
                  </div>
                </div>
                <div className="banner-bottom-item">
                  <div className="banner-bottom-icon">
                    <i className="fas fa-flask"></i>
                  </div>
                  <div className="banner-bottom-text">
                    <FormattedMessage id="banner.item4" />
                  </div>
                </div>
                <div className="banner-bottom-item">
                  <div className="banner-bottom-icon">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="banner-bottom-text">
                    <FormattedMessage id="banner.item5" />
                  </div>
                </div>
                <div className="banner-bottom-item">
                  <div className="banner-bottom-icon">
                    <i className="fas fa-briefcase-medical"></i>
                  </div>
                  <div className="banner-bottom-text">
                    <FormattedMessage id="banner.item6" />
                  </div>
                </div>
                <div className="banner-bottom-item">
                  <div className="banner-bottom-icon">
                    <i className="fas fa-ambulance"></i>
                  </div>
                  <div className="banner-bottom-text">
                    <FormattedMessage id="banner.item7" />
                  </div>
                </div>
                <div className="banner-bottom-item">
                  <div className="banner-bottom-icon">
                    <i className="fas fa-ambulance"></i>
                  </div>
                  <div className="banner-bottom-text">
                    <FormattedMessage id="banner.item8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
  return {
    changeLanguageAppRedux: (language) => {
      dispatch(changeLanguageApp(language));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
