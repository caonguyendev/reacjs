import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import { getDetailInfoDoctor } from "../../../services/userService";
import "./DetailDoctor.scss";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorId: "",
      doctor: {},
    };
  }

  async componentDidMount() {
    if (this.props.match?.params?.id) {
      let id = this.props.match.params.id;
      let res = await getDetailInfoDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          doctorId: id,
          doctor: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    let { doctor, doctorId } = this.state;
    let { language } = this.props;
    let nameVi = "";
    let nameEn = "";
    if (doctor && doctor.positionData) {
      nameVi = `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName}`;
      nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
    }
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="doctor-info">
            <div className="container">
              <div className="image-container">
                {doctor.image && <img src={doctor.image} />}
              </div>
              <div className="content-container">
                <h2 style={{ fontWeight: "bold" }}>
                  {language === LANGUAGES.VI ? nameVi : nameEn}
                </h2>
                {doctor && doctor.Markdown && doctor.Markdown.description && (
                  <p>{doctor.Markdown.description}</p>
                )}
              </div>
            </div>
          </div>
          <div className="doctor-schedule">
            <div className="content-left">
              <DoctorSchedule doctorId={doctorId} />
            </div>
            <div className="content-right">
              <DoctorExtraInfor doctorId={doctorId} />
            </div>
          </div>
          <div className="doctor-detail-info">
            <div className="container">
              {doctor && doctor.Markdown && doctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: doctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
            </div>
          </div>
          <div className="doctor-comment"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
