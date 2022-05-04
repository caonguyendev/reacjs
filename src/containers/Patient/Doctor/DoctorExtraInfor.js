import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { getExtraInforDoctorById } from "../../../services/userService";
import NumberFormat from "react-number-format";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvaiableTimes: [],
      isShow: false,

      extraInfor: [],
    };
  }

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
    }
    if (prevProps.doctorId !== this.props.doctorId) {
      let res = await getExtraInforDoctorById(this.props.doctorId);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  render() {
    // let { doctor } = this.state;
    let { language } = this.props;
    let { isShow, extraInfor } = this.state;
    let price = "",
      payment = "",
      province = "",
      suffix = "";
    if (language === LANGUAGES.VI) {
      if (extraInfor?.priceData?.valueVi) {
        price = extraInfor.priceData.valueVi;
        suffix = "đ";
      }
      if (extraInfor?.paymentData?.valueVi) {
        payment = extraInfor.paymentData.valueVi;
      }
      if (extraInfor?.provinceData?.valueVi) {
        province = extraInfor.provinceData.valueVi;
      }
    } else if (language === LANGUAGES.EN) {
      if (extraInfor?.priceData?.valueEn) {
        price = extraInfor.priceData.valueEn;
        suffix = "$";
      }
      if (extraInfor?.paymentData?.valueEn) {
        payment = extraInfor.paymentData.valueEn;
      }
      if (extraInfor?.provinceData?.valueEn) {
        province = extraInfor.provinceData.valueEn;
      }
    }
    return (
      <div className="doctor-extraInfor-container">
        <h2>
          {" "}
          <FormattedMessage id="patient.extra-infor-doctor.address" />
        </h2>
        <h3>
          {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
        </h3>
        <p className="address">
          {extraInfor && extraInfor.addressClinic
            ? extraInfor.addressClinic
            : ""}
        </p>
        <div className="doctor-extraInfor-price-container">
          {isShow === false ? (
            <div>
              <span>
                {" "}
                <FormattedMessage id="patient.extra-infor-doctor.price" />
              </span>
              <span>
                <NumberFormat
                  value={price}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={suffix}
                />
              </span>
              <span
                className="show"
                onClick={() => this.setState({ isShow: true })}
                Xem
                chi
                tiết
              >
                &nbsp;{" "}
                <FormattedMessage id="patient.extra-infor-doctor.see-details" />
              </span>
            </div>
          ) : (
            <>
              <h2>
                {" "}
                <FormattedMessage id="patient.extra-infor-doctor.price" />
              </h2>
              <div className="top-bottom-container">
                <div className="top">
                  <div className="title-container">
                    <div className="price-title">
                      <FormattedMessage id="patient.extra-infor-doctor.price" />
                    </div>
                    <div className="price">
                      <NumberFormat
                        value={price}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={suffix}
                      />
                    </div>
                  </div>
                  <div className="note">
                    {extraInfor && extraInfor.note ? extraInfor.note : ""}
                  </div>
                </div>
                <div className="bottom payment">
                  <FormattedMessage id="patient.extra-infor-doctor.payment" />
                  {payment && payment}
                </div>
              </div>
              <span
                className="hide"
                onClick={() => this.setState({ isShow: false })}
              >
                <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
              </span>
            </>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
