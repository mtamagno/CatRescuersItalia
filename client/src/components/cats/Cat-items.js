import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is_empty";

class CatItem extends Component {
  render() {
    const { cats } = this.props;
    console.log("hey " + cats);
    return (
      <div className="card card-body bg-ligh mb-3">
        <div className="row">
          <div className="col-2">
            <img src={cats.photo} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h4>{cats.name}</h4>
            <p>{cats.status}</p>
            <p>
              {isEmpty(cats.location) ? null : <span>{cats.location}</span>}
            </p>
            <Link to={`/cats/${cats.handle}`} className="btn btn-info">
              More Here!
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

CatItem.propTypes = {
  cats: PropTypes.object.isRequired
};

export default CatItem;
