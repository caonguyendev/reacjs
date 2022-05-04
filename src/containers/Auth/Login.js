import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isPasswordHidden: true,
      errorMessage: "",
    };
  }

  handleOnChangeUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handleOnChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  async handleLogin() {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data?.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      } else {
        this.props.userLoginSuccess(data.user.user);
      }
    } catch (error) {
      if (error?.response?.data) {
        this.setState({
          errMessage: error.response.data.message,
        });
      }
    }
  }

  handleShowHidePassword() {
    let { isPasswordHidden } = this.state;
    this.setState({ isPasswordHidden: !isPasswordHidden });
  }

  handleOnKeyDown = (event) => {
    // Enter key
    if (event.keyCode === 13) {
      this.handleLogin();
    }
  };

  render() {
    let { username, password, isPasswordHidden } = this.state;
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-center text-login">Login</div>
            <div className="col-12 form-group mb-3">
              <label>Username: </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(event) => this.handleOnChangeUsername(event)}
              />
            </div>
            <div className="col-12 form-group">
              <label>Password: </label>
              <div className="input-password">
                <input
                  type={isPasswordHidden ? "password" : "text"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                  onKeyDown={(event) => this.handleOnKeyDown(event)}
                />
                <span
                  className="eye-toggle"
                  onClick={() => this.handleShowHidePassword()}
                >
                  <i
                    className={
                      isPasswordHidden ? "fas fa-eye-slash" : "fas fa-eye"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12 mt-1" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 form-group mt-3 mb-2">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Log in
              </button>
            </div>
            <div className="col-12 mb-4">
              <span className="forgot-password">Forgot your password</span>
            </div>
            <div className="col-12 mb-3 text-center signin-with">
              Or sign in with:
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g"></i>
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
            </div>
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
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
