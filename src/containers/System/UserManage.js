import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManager.scss";
import { getAllUsers, createNewUserService } from "../../services/userService";
import ModalUser from "./ModalUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModal: false,
    };
  }

  async componentDidMount() {
    this.getAllUsersFromReact();
  }

  async getAllUsersFromReact() {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  }

  // open modal
  handleAddNewUser = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  closeModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  scrollIntoView = (selector) => {
    let element = document.querySelector(selector);
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  createNewUser = async (childState) => {
    try {
      let response = await createNewUserService(childState);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        let { arrUsers } = this.state;
        this.setState({
          arrUsers: [...arrUsers, childState],
        });
        this.closeModal();
        this.scrollIntoView("table#customers");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let { arrUsers } = this.state;
    console.log("render");
    return (
      <>
        <div className="user-container">
          <ModalUser
            isOpen={this.state.isOpenModal}
            closeModal={this.closeModal}
            createNewUser={this.createNewUser}
          />
          <div className="title text-center">Manager user</div>
          <div className="mx-1">
            <button
              className="btn btn-primary px-3"
              onClick={() => this.handleAddNewUser()}
            >
              <i className="fas fa-plus"></i> Add new users
            </button>
          </div>
          <div className="user-table mt-3">
            <table id="customers">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {arrUsers &&
                  arrUsers.length > 0 &&
                  arrUsers.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                          <button className="btn-edit">
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button className="btn-delete">
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
