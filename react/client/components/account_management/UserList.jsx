import React from "react";
import { Button, Table, Modal } from "react-bootstrap";

class UserList extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { showModal: false };
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  handleUpdateClick(e) {
    e.preventDefault();
    //iff checked
    var id = e.target.value;
    var checked = document.getElementById(id).checked;
    this.props.updateAdmin(id, checked);
  }

  handleCheckBoxChange(e) {
    e.preventDefault();
    this.openModal();
    var id = e.target.id;
    var checked = document.getElementById(id).checked;
    this.props.updateAdmin(id, checked);
  }

  handleDeleteClick(e) {
    e.preventDefault();
    var id = e.target.id;
    console.log("id", id, this.props.currentUser.id);
    if (id == this.props.currentUser.id) {
      alert("Current User cannot be deleted!");
      return;
    }
    this.props.deleteUser(id);
  }

  render() {
    console.log("userlist props", this.props);
    var list;
    var modalPopUp = (
      <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Admin Privileges</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Grant Administration Privileges Sparingly</h4>
          <p>Are You Sure?.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            pullLeft
            bsStyle="success"
            onClick={this.closeModal.bind(this)}
          >
            Confirm
          </Button>
          <Button pullRight onClick={this.closeModal.bind(this)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );

    if (this.props.users) {
      this.props.users.sort(function(a, b) {
        return a.email < b.email ? -1 : 1;
      });

      list = this.props.users.map((user, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <input
                type="checkbox"
                onChange={this.handleCheckBoxChange.bind(this)}
                checked={user.admin}
                id={user.id}
                key={index}
              />
            </td>

            <td>{user.email}</td>
            <td>
              <Button
                bsSize="small"
                bsStyle="warning"
                id={user.id}
                onClick={this.handleDeleteClick.bind(this)}
              >
                Delete
              </Button>
            </td>
            <td>
              <Button
                bsSize="small"
                bsStyle="info"
                onClick={this.handleUpdateClick.bind(this)}
                value={user.id}
              >
                Update
              </Button>
            </td>
          </tr>
        );
      });
    }

    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Admin</th>
              <th>Email</th>
              <th>Delete?</th>
              <th>Edit?</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </Table>
        {modalPopUp}
      </div>
    );
  }
}

export default UserList;

//   <li key={index}>
// <input
// type='checkbox'
// onChange={this.handleCheckBoxChange.bind(this)}
// checked={user.admin} id={user.id} key={index}
// />
// {user.email}
// {user.admin}
// <Button bsSize='small' bsStyle='warning'>Delete</Button>
// <Button bsSize='small' bsStyle='info' onClick={this.handleUpdateClick.bind(this)} value={user.id} >Update</Button>
// </li>
