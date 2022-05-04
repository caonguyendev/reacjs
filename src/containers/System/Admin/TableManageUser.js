import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  componentDidMount() {
    this.props.getAllUsersRedux();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.usersRedux !== this.props.usersRedux) {
      this.setState({ usersRedux: this.props.usersRedux });
    }
  }

  handleEditUser(user) {
    this.props.handleEditUserFromParent(user);
  }

  handleDeleteUser(user) {
    this.props.deleteAUserRedux(user.id);
  }

  render() {
    let users = this.state.usersRedux;
    return (
      <>
        <table id="tableManageUser" className="mb-5">
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
            {users &&
              users.length > 0 &&
              users.map((item, index) => {
                return (
                  <tr key={index}>
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
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (userId) => dispatch(actions.deleteAUser(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
