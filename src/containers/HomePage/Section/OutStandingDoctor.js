import React, { Component } from "react";
import { connect } from "react-redux";
import "./OutStandingDoctor.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/images/bsckii-tran-minh-khuyen.jpg";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
    };
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        doctors: this.props.topDoctorsRedux,
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
    // return <Redirect to={`/doctor/${doctor.id}`} push="true" />;
  };

  render() {
    console.log("check props", this.props);
    let language = this.props.language;
    let doctors = this.state.doctors;
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <>
        <section className="section-outstanding-doctor">
          <div className="section-container container">
            <div className="section-title">
              <h1>
                <FormattedMessage id="homepage.outstanding-doctor" />
              </h1>
              <button>
                <FormattedMessage id="homepage.more-info" />
              </button>
            </div>
            <div className="section-content">
              <Slider {...settings}>
                {doctors &&
                  doctors.length > 0 &&
                  doctors.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                    return (
                      <div
                        className="slide-item"
                        key={index}
                        onClick={() => this.handleViewDetailDoctor(item)}
                      >
                        <img src={imageBase64} />
                        <h3>{language === LANGUAGES.VI ? nameVi : nameEn}</h3>
                        <span></span>
                      </div>
                    );
                  })}
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
    topDoctorsRedux: state.admin.doctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => {
      dispatch(actions.fetchTopDoctor());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
