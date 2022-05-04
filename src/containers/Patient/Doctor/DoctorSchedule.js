import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import { getScheduleDoctorByDate } from "../../../services/userService";
import localization from "moment/locale/vi";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvaiableTimes: [],
    };
  }

  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).add(i, "days").format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = this.capitalizeFirstLetter(today);
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).add(i, "days").format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = this.capitalizeFirstLetter(today);
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };

  componentDidMount() {
    let allDays = this.getArrDays(this.props.language);
    this.loadTodaySchedule(allDays);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (prevProps.doctorId !== this.props.doctorId) {
      let allDays = this.getArrDays(this.props.language);
      this.loadTodaySchedule(allDays);
    }
  }

  async loadTodaySchedule(allDays) {
    if (allDays && allDays.length > 0) {
      if (this.props.doctorId) {
        let doctorId = this.props.doctorId;
        let res = await getScheduleDoctorByDate(doctorId, allDays[0].value);
        this.setState({
          allDays: allDays,
          allAvaiableTimes: res.data,
        });
      }
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorId) {
      let doctorId = this.props.doctorId;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          allAvaiableTimes: res.data,
        });
      }
    }
  };

  render() {
    // let { doctor } = this.state;
    let { language } = this.props;
    let { allDays, allAvaiableTimes } = this.state;
    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select
            className="select-day"
            onChange={(event) => this.handleOnChangeSelect(event)}
          >
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="all-avaiable-time">
          <div className="text-calendar">
            <span>
              <i className="fas fa-calendar-alt">
                &nbsp;
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </i>
            </span>
          </div>
          <div className="time-content">
            {allAvaiableTimes && allAvaiableTimes.length > 0 ? (
              <>
                <div className="time-content-btns">
                  {allAvaiableTimes.map((item, index) => {
                    let timeValue = "";
                    if (language === LANGUAGES.VI) {
                      timeValue = item.timeData.valueVi;
                    } else if (language === LANGUAGES.EN) {
                      timeValue = item.timeData.valueEn;
                    }
                    return <button key={index}>{timeValue}</button>;
                  })}
                </div>
                <div className="book-free">
                  <span>
                    <FormattedMessage id="patient.detail-doctor.choose" />{" "}
                    <i className="far fa-hand-point-up"></i>{" "}
                    <FormattedMessage id="patient.detail-doctor.book-free" />
                  </span>
                </div>
              </>
            ) : (
              <div className="no-schedule">
                <FormattedMessage id="patient.detail-doctor.no-schedule-avaiable" />
              </div>
            )}
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
