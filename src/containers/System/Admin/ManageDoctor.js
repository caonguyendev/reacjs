import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { CRUD_ACTIONS } from "../../../utils/constant";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { getDetailInfoDoctor } from "../../../services/userService";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { isThisTypeNode } from "typescript";
import { isBuffer } from "lodash";
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // save to Markdown table
      doctors: [],
      contentHTML: "",
      contentMarkdown: "",
      selectedDoctor: "",
      description: "",
      action: "",
      hasOldData: false,

      // Save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  changeCurrValueSelectViEn(dataSelect, keyState) {
    return dataSelect.find((item) => item.value === this.state[keyState].value);
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfor();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.doctorsRedux !== this.props.doctorsRedux) {
      let dataSelectDoctor = this.buildDataInputSelect(
        this.props.doctorsRedux,
        "USERS"
      );
      this.setState({
        doctors: dataSelectDoctor,
      });
    }
    if (prevProps.language !== this.props.language) {
      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorInfor;

      let dataSelectDoctor = this.buildDataInputSelect(
        this.props.doctorsRedux,
        "USERS"
      );
      let dataSelectPrice = this.buildDataInputSelect(resPrice);
      let dataSelectPayment = this.buildDataInputSelect(resPayment);
      let dataSelectProvince = this.buildDataInputSelect(resProvince);

      // Change currrent value (vi/en) of select when change language
      let selectedDoctor = this.changeCurrValueSelectViEn(
        dataSelectDoctor,
        "selectedDoctor"
      );
      let selectedPrice = this.changeCurrValueSelectViEn(
        dataSelectPrice,
        "selectedPrice"
      );
      let selectedPayment = this.changeCurrValueSelectViEn(
        dataSelectPayment,
        "selectedPayment"
      );
      let selectedProvince = this.changeCurrValueSelectViEn(
        dataSelectProvince,
        "selectedProvince"
      );
      this.setState({
        doctors: dataSelectDoctor,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        selectedDoctor: selectedDoctor ? selectedDoctor : "",
        selectedPrice: selectedPrice ? selectedPrice : "",
        selectedPayment: selectedPayment ? selectedPayment : "",
        selectedProvince: selectedProvince ? selectedProvince : "",
      });
    }
    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice);
      let dataSelectPayment = this.buildDataInputSelect(resPayment);
      let dataSelectProvince = this.buildDataInputSelect(resProvince);

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi =
          type === "USERS"
            ? `${item.lastName} ${item.firstName}`
            : item.valueVi;
        let labelEn =
          type === "USERS"
            ? `${item.firstName} ${item.lastName}`
            : item.valueEn;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = type === "USERS" ? item.id : item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleSaveContentMarkdown = () => {
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      action:
        this.state.hasOldData === true
          ? CRUD_ACTIONS.EDIT
          : CRUD_ACTIONS.CREATE,
    });
  };

  handleChangeSelectDoctor = async (selectedDoctor) => {
    let res = await getDetailInfoDoctor(selectedDoctor.value);
    let { data } = res;
    let { language } = this.props;
    let contentHTML = "";
    let contentMarkdown = "";
    let description = "";
    let hasOldData = false;
    let addressClinic = "";
    let nameClinic = "";
    let selectedPrice = "";
    let selectedPayment = "";
    let selectedProvince = "";
    let note = "";
    if (res?.errCode === 0 && data?.Markdown?.contentHTML) {
      if (data?.Doctor_Infor?.paymentId) {
        selectedPrice = {
          label:
            language === LANGUAGES.VI
              ? data.Doctor_Infor.priceData.valueVi
              : data.Doctor_Infor.priceData.valueEn,
          value: data.Doctor_Infor.priceId,
        };

        selectedPayment = {
          label:
            language === LANGUAGES.VI
              ? data.Doctor_Infor.paymentData.valueVi
              : data.Doctor_Infor.paymentData.valueEn,
          value: data.Doctor_Infor.paymentId,
        };

        selectedProvince = {
          label:
            language === LANGUAGES.VI
              ? data.Doctor_Infor.provinceData.valueVi
              : data.Doctor_Infor.provinceData.valueEn,
          value: data.Doctor_Infor.provinceId,
        };
        addressClinic = data.Doctor_Infor.addressClinic;
        nameClinic = data.Doctor_Infor.nameClinic;
        note = data.Doctor_Infor.note;
      }
      contentHTML = data.Markdown.contentHTML;
      contentMarkdown = data.Markdown.contentMarkdown;
      description = data.Markdown.description;
      hasOldData = true;
      this.setState({
        selectedDoctor,
        contentHTML,
        contentMarkdown,
        description,
        hasOldData,
        addressClinic,
        nameClinic,
        selectedPrice,
        selectedPayment,
        selectedProvince,
        note,
      });
    }
  };

  handleChangeSelectDoctorInfor = async (selectedDoctorInfor, name) => {
    console.log("check selectedDoctorInfor", selectedDoctorInfor, name);
    let stateName = name.name;
    this.setState({
      [stateName]: selectedDoctorInfor,
    });
  };

  handleOnChangeDoctorInfor = (event, inputId) => {
    this.setState({
      [inputId]: event.target.value,
    });
  };

  render() {
    let { hasOldData } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="info-top">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelectDoctor}
              options={this.state.doctors}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              }
            />
          </div>
          <div className="content-right">
            <label>
              <FormattedMessage id="admin.manage-doctor.intro" />{" "}
            </label>
            <textarea
              className="form-control"
              placeholder
              value={this.state.description}
              onChange={(event) =>
                this.handleOnChangeDoctorInfor(event, "description")
              }
            />
          </div>
        </div>
        <div className="info-middle row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPrice}
              placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPayment}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.payment" />
              }
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listProvince}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.province" />
              }
              name="selectedProvince"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.nameClinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeDoctorInfor(event, "nameClinic")
              }
              value={this.state.nameClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.addressClinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeDoctorInfor(event, "addressClinic")
              }
              value={this.state.addressClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeDoctorInfor(event, "note")
              }
              value={this.state.note}
            />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            value={this.state.contentMarkdown}
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          className={hasOldData ? "btn btn-warning" : "btn btn-primary"}
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {hasOldData === true ? (
            <FormattedMessage id="admin.manage-doctor.save" />
          ) : (
            <FormattedMessage id="admin.manage-doctor.add" />
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    doctorsRedux: state.admin.doctors,
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => {
      dispatch(actions.fetchAllDoctors());
    },
    getAllRequiredDoctorInfor: () => {
      dispatch(actions.getRequiredDoctorInfor());
    },
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
