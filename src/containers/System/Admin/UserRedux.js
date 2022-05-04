import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import TableManageUser from "./TableManageUser";
import "react-image-lightbox/style.css";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",

      action: "",
      userEditId: "",
    };
  }

  componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // try {
    //   let res = await getAllCodeService("gender");
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // render lần 2 trở đi => didupdate
    // so sánh giữa props hiện tại và quá khứ
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    if (prevProps.usersRedux !== this.props.usersRedux) {
      let arrGenders = this.props.genderRedux;
      let arrPositions = this.props.positionRedux;
      let arrRoles = this.props.roleRedux;

      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        avatar: "",
        previewImgURL: "",

        action: CRUD_ACTIONS.CREATE,
      });
    }
  }

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      let base64Image = await CommonUtils.toBase64(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64Image,
      });
    }
  };

  handleOpenPreviewImage() {
    this.setState({
      isOpen: true,
    });
  }

  checkValidInput() {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      // Check field is empty or not
      let key = arrCheck[i];
      if (!this.state[key]) {
        alert(`Missing ${key} field!`);
        isValid = false;
        break;
      }
    }
    return isValid;
  }

  handleSaveUser = (user) => {
    // validate input
    let isValid = this.checkValidInput();
    if (isValid === false) return;

    let { action } = this.state;

    if (action === CRUD_ACTIONS.CREATE) {
      // fire redux action create user
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    } else if (action === CRUD_ACTIONS.EDIT) {
      // fire redux action edit user
      this.props.editAUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };

  onChangeInput(event, field) {
    this.setState({
      ...this.state,
      [field]: event.target.value,
    });
    // email: "",
    //   password: "",
    //   firstName: "",
    //   lastName: "",
    //   address: "",
    //   phoneNumber: "",
    //   gender: "",
    //   position: "",
    //   role: "",
    //   avatar: "",
  }

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phonenumber,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: "",
      previewImgURL: imageBase64,

      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let { language, isLoadingGender } = this.props;
    let {
      isOpen,
      previewImgURL,

      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      position,
      role,
      avatar,

      action,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">Learn React-Redux CRUD</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 fw-bold">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-12 my-3">
                {isLoadingGender === true ? "Loading gender...." : " "}
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  disabled={action === CRUD_ACTIONS.EDIT ? true : false}
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(event) => this.onChangeInput(event, "email")}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  disabled={action === CRUD_ACTIONS.EDIT ? true : false}
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(event) => this.onChangeInput(event, "password")}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(event) => this.onChangeInput(event, "firstName")}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(event) => this.onChangeInput(event, "lastName")}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(event) => this.onChangeInput(event, "phoneNumber")}
                />
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(event) => this.onChangeInput(event, "address")}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => this.onChangeInput(event, "gender")}
                  value={gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => this.onChangeInput(event, "position")}
                  value={position}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => this.onChangeInput(event, "role")}
                  value={role}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <input
                  id="previewImg"
                  type="file"
                  hidden
                  onChange={(event) => this.handleOnChangeImage(event)}
                />
                <div className="preview-img-container">
                  <label className="label-upload" htmlFor="previewImg">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                  {previewImgURL && (
                    <div
                      className="preview-img"
                      style={{
                        backgroundImage: `url(${previewImgURL})`,
                      }}
                      onClick={() => this.handleOpenPreviewImage()}
                    ></div>
                  )}
                </div>
              </div>
              <div className="col-12 my-3">
                <button
                  className={
                    action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </div>
              <div className="col-12">
                <TableManageUser
                  handleEditUserFromParent={this.handleEditUserFromParent}
                />
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <Lightbox
            mainSrc={previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    usersRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => {
      dispatch(actions.fetchGenderStart());
    },
    getPositionStart: () => {
      dispatch(actions.fetchPositionStart());
    },
    getRoleStart: () => {
      dispatch(actions.fetchRoleStart());
    },
    createNewUser: (data) => {
      dispatch(actions.createNewUser(data));
    },
    getAllUsersRedux: () => {
      dispatch(actions.fetchAllUsersStart());
    },
    editAUserRedux: (data) => {
      dispatch(actions.editAUser(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
