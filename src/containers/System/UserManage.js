import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManager.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  updateUserDataService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModal: false,
      isOpenModalEditUser: false,
      userEdit: {},
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
  handleAddNewUser = (data) => {
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
        this.getAllUsersFromReact();
        this.closeModal();
        this.scrollIntoView("table#customers");
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };

  async handleDeleteUser(user) {
    try {
      let response = await deleteUserService(user.id);
      if (response && response.errCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(response.errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleEditUser = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };

  closeModalEdit = () => {
    this.setState({
      isOpenModalEditUser: false,
    });
  };

  editUser = async (user) => {
    try {
      let response = await updateUserDataService(user);
      if (response && response.errCode === 0) {
        this.setState({ isOpenModalEditUser: false });
        await this.getAllUsersFromReact();
      } else {
        alert(response.errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let { arrUsers } = this.state;
    return (
      <>
        <div className="user-container">
          <ModalUser
            isOpen={this.state.isOpenModal}
            closeModal={this.closeModal}
            createNewUser={this.createNewUser}
          />
          {this.state.isOpenModalEditUser && (
            <ModalEditUser
              isOpen={this.state.isOpenModalEditUser}
              closeModal={this.closeModalEdit}
              currentUser={this.state.userEdit}
              editUser={this.editUser}
            />
          )}
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
                          <button
                            className="btn-edit"
                            onClick={() => this.handleEditUser(item)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => this.handleDeleteUser(item)}
                          >
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
