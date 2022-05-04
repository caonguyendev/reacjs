import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      // reset state
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  }

  componentDidMount() {}

  toggle = () => {
    this.props.closeModal();
  };

  handleOnChangeInput(event) {
    let inputName = event.target.name;
    let inputValue = event.target.value;
    this.setState({
      [inputName]: inputValue,
    });
  }

  checkValidInput = () => {
    let isValid = true;
    let data = { ...this.state };
    for (const key in data) {
      if (!data[key]) {
        isValid = false;
        alert(`Missing parameter: ${key}`);
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser() {
    let isValid = this.checkValidInput();
    if (isValid) {
      this.props.createNewUser(this.state);
    }
  }

  render() {
    // console.log(">>> check child props", this.props);
    // console.log(">>> check child open modal", this.props.isOpen);
    return (
      <div>
        <Modal
          size="lg"
          isOpen={this.props.isOpen}
          className="model-user-container"
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Create a new user</ModalHeader>
          <ModalBody>
            <div className="modal-user-body">
              <div className="input-container">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={(event) => this.handleOnChangeInput(event)}
                  value={this.state.email}
                />
              </div>
              <div className="input-container">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={(event) => this.handleOnChangeInput(event)}
                  value={this.state.password}
                />
              </div>
              <div className="input-container">
                <label>First name</label>
                <input
                  type="text"
                  name="firstName"
                  onChange={(event) => this.handleOnChangeInput(event)}
                  value={this.state.firstName}
                />
              </div>
              <div className="input-container">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  onChange={(event) => this.handleOnChangeInput(event)}
                  value={this.state.lastName}
                />
              </div>
              <div className="input-container max-w">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  onChange={(event) => this.handleOnChangeInput(event)}
                  value={this.state.address}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="px-3"
              color="primary"
              onClick={() => this.handleAddNewUser()}
            >
              Add new
            </Button>{" "}
            <Button className="px-3" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalUser;
