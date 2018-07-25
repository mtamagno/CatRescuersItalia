import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteCats } from "../../actions/profileAction";

class Cats extends Component {
  onDeleteClick(id) {
    this.props.deleteCats(id);
  }

  render() {
    const cat = this.props.cats.map(cat => (
      <tr style={{ verticalAlign: "middle" }} key={cat._id}>
        <td>
          <img
            style={{ width: "100px", height: "100px" }}
            src={cat.photo}
            alt=""
            className="img-thumbnail"
          />
        </td>
        <td style={{ verticalAlign: "middle" }}>{cat.name}</td>
        <td style={{ verticalAlign: "middle" }}>{cat.age}</td>
        <td style={{ verticalAlign: "middle" }}>{cat.location}</td>
        <td style={{ verticalAlign: "middle" }}>
          <button
            onClick={this.onDeleteClick.bind(this, cat._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h3>Cats in Need</h3>
        <table className="table">
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>age</th>
              <th>Location</th>
              <th />
            </tr>
          </thead>
          <tbody>{cat}</tbody>
        </table>
      </div>
    );
  }
}

Cats.propTypes = {
  deleteCats: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteCats }
)(Cats);
